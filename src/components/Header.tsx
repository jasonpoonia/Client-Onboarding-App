import React from 'react';
import { Blocks } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Blocks className="h-8 w-8 text-blue-800" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Lucid Media</span>
          </div>
        </div>
      </div>
    </header>
  );
}