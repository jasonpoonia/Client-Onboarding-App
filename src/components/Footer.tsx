import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Lucid Media. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-sm text-gray-600 hover:text-blue-800"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-600 hover:text-blue-800"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/data-deletion"
              className="text-sm text-gray-600 hover:text-blue-800"
            >
              Data Deletion
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}