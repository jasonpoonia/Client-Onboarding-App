export type Platform = 'google' | 'meta' | 'tiktok' | 'linkedin';

export type PermissionLevel = 'view' | 'edit' | 'admin';

export interface AccessRequest {
  id: string;
  platforms: {
    platform: Platform;
    permissionLevel: PermissionLevel;
    tokens?: {
      accessToken: string;
      refreshToken?: string;
      expiresIn?: number;
    };
  }[];
  status: 'pending' | 'completed';
  clientEmail: string;
  clientName: string;
  companyName: string;
  createdAt: string;
}

export interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
}