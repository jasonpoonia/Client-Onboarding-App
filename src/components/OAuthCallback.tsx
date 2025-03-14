import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleGoogleCallback } from '../services/googleAuth';
import { handleMetaCallback } from '../services/metaAuth';

export function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const platform = state?.split(':')[0];

  useEffect(() => {
    const processOAuth = async () => {
      if (!code || !platform) {
        console.error('Missing code or platform');
        window.close();
        return;
      }

      try {
        let result;
        switch (platform) {
          case 'google':
            result = await handleGoogleCallback(code);
            break;
          case 'meta':
            result = await handleMetaCallback(code);
            break;
          default:
            throw new Error(`Unsupported platform: ${platform}`);
        }

        // Send success message to parent window with connection details
        window.opener?.postMessage({
          type: 'OAUTH_SUCCESS',
          platform,
          data: result,
          timestamp: new Date().getTime()
        }, window.location.origin);

        // Close the popup
        window.close();
      } catch (error) {
        console.error('OAuth callback error:', error);
        window.opener?.postMessage({
          type: 'OAUTH_ERROR',
          platform,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().getTime()
        }, window.location.origin);
        window.close();
      }
    };

    processOAuth();
  }, [code, platform, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Processing Authorization
        </h2>
        <p className="text-gray-600">
          Please wait while we complete the connection...
        </p>
      </div>
    </div>
  );
}