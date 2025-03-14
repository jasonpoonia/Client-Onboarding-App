import React from 'react';
import { Facebook, Linkedin, Youtube, Video } from 'lucide-react';
import type { Platform, PermissionLevel } from '../types';
import { getGoogleAuthUrl } from '../services/googleAuth';
import { getMetaAuthUrl } from '../services/metaAuth';

interface PlatformCardProps {
  platform: Platform;
  permissionLevel: PermissionLevel;
  onConnect: () => void;
  isConnected: boolean;
}

const platformConfig = {
  meta: {
    name: 'Meta Ads',
    icon: Facebook,
    description: 'Access to Facebook and Instagram advertising',
    getAuthUrl: getMetaAuthUrl,
  },
  google: {
    name: 'Google Ads',
    icon: Youtube,
    description: 'Access to Google Ads and Analytics',
    getAuthUrl: getGoogleAuthUrl,
  },
  linkedin: {
    name: 'LinkedIn Ads',
    icon: Linkedin,
    description: 'Access to LinkedIn advertising platform',
    getAuthUrl: () => '', // To be implemented
  },
  tiktok: {
    name: 'TikTok Ads',
    icon: Video,
    description: 'Access to TikTok advertising platform',
    getAuthUrl: () => '', // To be implemented
  },
};

export function PlatformCard({ platform, permissionLevel, onConnect, isConnected }: PlatformCardProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  const handleConnect = async () => {
    try {
      const authUrl = config.getAuthUrl();
      if (authUrl) {
        // Open OAuth window
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        
        window.open(
          authUrl,
          'OAuth2',
          `width=${width},height=${height},left=${left},top=${top}`
        );
        
        onConnect();
      }
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-blue-800" />
        <h3 className="ml-3 text-lg font-medium text-gray-900">{config.name}</h3>
      </div>
      <p className="text-gray-600 mb-4">{config.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Permission Level: <span className="font-medium capitalize">{permissionLevel}</span>
        </span>
        <button
          onClick={handleConnect}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isConnected
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-blue-800 text-white hover:bg-blue-700'
          }`}
        >
          {isConnected ? 'Connected' : 'Connect'}
        </button>
      </div>
    </div>
  );
}