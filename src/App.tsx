import React, { useState } from 'react';
import { Header } from './components/Header';
import { PlatformCard } from './components/PlatformCard';
import type { Platform } from './types';

function App() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<Platform[]>([]);

  const handleConnect = (platform: Platform) => {
    setConnectedPlatforms((prev) => [...prev, platform]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Grant Access to Your Advertising Platforms
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please connect your advertising accounts to grant Lucid Media access. 
            We'll help you manage and optimize your campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlatformCard
            platform="meta"
            permissionLevel="admin"
            onConnect={() => handleConnect('meta')}
            isConnected={connectedPlatforms.includes('meta')}
          />
          <PlatformCard
            platform="google"
            permissionLevel="admin"
            onConnect={() => handleConnect('google')}
            isConnected={connectedPlatforms.includes('google')}
          />
          <PlatformCard
            platform="linkedin"
            permissionLevel="admin"
            onConnect={() => handleConnect('linkedin')}
            isConnected={connectedPlatforms.includes('linkedin')}
          />
          <PlatformCard
            platform="tiktok"
            permissionLevel="admin"
            onConnect={() => handleConnect('tiktok')}
            isConnected={connectedPlatforms.includes('tiktok')}
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact support@lucidmedia.com
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;