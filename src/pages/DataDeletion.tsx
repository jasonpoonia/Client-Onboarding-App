import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Send } from 'lucide-react';

export function DataDeletion() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Deletion Request</h1>
        
        <div className="prose prose-blue max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Data Privacy Rights</h2>
            <p className="text-gray-600 mb-4">
              In accordance with privacy laws and regulations, you have the right to request the deletion
              of your personal data from our systems. This includes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Personal information (name, email, contact details)</li>
              <li>Business account access and credentials</li>
              <li>Historical campaign data and reports</li>
              <li>Communication history</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Request Data Deletion</h2>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center w-full rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Deletion Request
                </button>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-green-700">
                  Your data deletion request has been received. We will process your request within 30 days
                  and send a confirmation email once completed.
                </p>
              </div>
            )}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Happens Next</h2>
            <p className="text-gray-600 mb-4">
              After submitting your request:
            </p>
            <ol className="list-decimal pl-6 text-gray-600 mb-4">
              <li>We will verify your identity to ensure the security of the process</li>
              <li>Review all associated data across our systems</li>
              <li>Process the deletion within 30 days</li>
              <li>Send a confirmation email once the deletion is complete</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about data deletion, please contact our Data Protection Officer at:
              <br />
              <a href="mailto:privacy@lucidmedia.com" className="text-blue-800 hover:underline">
                privacy@lucidmedia.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}