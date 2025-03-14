import { FacebookAdsApi, User, Business } from 'facebook-nodejs-business-sdk';

const META_APP_ID = import.meta.env.VITE_META_APP_ID;
const META_APP_SECRET = import.meta.env.VITE_META_APP_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AGENCY_BUSINESS_ID = import.meta.env.VITE_META_AGENCY_BUSINESS_ID;

export const getMetaAuthUrl = () => {
  const state = 'meta:' + Math.random().toString(36).substring(7);
  const scopes = [
    'ads_management',
    'ads_read',
    'business_management',
    'pages_manage_ads',
    'pages_show_list',
    'pages_read_engagement',
    'business_management',
    'catalog_management',
    'instagram_basic',
    'instagram_content_publish'
  ];

  return `https://www.facebook.com/v19.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(',')}&response_type=code&state=${state}`;
};

export const handleMetaCallback = async (code: string) => {
  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);
    const data = await response.json();
    
    // Initialize the Facebook Ads API
    FacebookAdsApi.init(data.access_token);
    
    // Get user info to verify connection
    const user = await new User().get();
    
    // Get all businesses the user has access to
    const businesses = await Business.getByUserId(user.id);
    
    // For each business, add your agency as a partner
    for (const business of businesses) {
      try {
        await business.createPartnerBusiness({
          partner_business_id: AGENCY_BUSINESS_ID,
          permitted_roles: ['ADMIN', 'EMPLOYEE', 'DEVELOPER'],
          current_permitted_roles: ['ADMIN', 'EMPLOYEE', 'DEVELOPER']
        });
      } catch (error) {
        console.error(`Error adding partner to business ${business.id}:`, error);
      }
    }
    
    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      userId: user.id,
      businesses: businesses.map(b => ({
        id: b.id,
        name: b.name
      }))
    };
  } catch (error) {
    console.error('Error getting Meta tokens:', error);
    throw error;
  }
};