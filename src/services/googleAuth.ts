// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export const getGoogleAuthUrl = () => {
  const scopes = [
    'https://www.googleapis.com/auth/adwords',
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/tagmanager.readonly',
    'https://www.googleapis.com/auth/analytics.manage.users',
    'https://www.googleapis.com/auth/analytics.edit'
  ];

  const state = 'google:' + Math.random().toString(36).substring(7);
  
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: scopes.join(' '),
    access_type: 'offline',
    state: state,
    prompt: 'consent'
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export const handleGoogleCallback = async (code: string) => {
  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokens.error_description || 'Failed to get access token');
    }

    // Link the authenticated user as an admin to the Google Ads account
    const response = await fetch('https://googleads.googleapis.com/v15/customers:mutateLink', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: {
          create: {
            clientCustomer: {
              resourceName: 'customers/${customerId}',
              accessRole: 'ADMIN',
              emailAddress: 'your-agency@example.com' // Replace with your agency email
            }
          }
        }
      })
    });

    const linkResult = await response.json();
    
    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      linkResult
    };
  } catch (error) {
    console.error('Error getting Google tokens:', error);
    throw error;
  }
};