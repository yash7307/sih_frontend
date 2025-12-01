import React from 'react';
import { Link } from 'react-router-dom';

export default function SubmissionSuccess() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                {/* Success Icon */}
                <div className="mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Registration Submitted Successfully! ✅
                </h1>

                <p className="text-gray-600 mb-6">
                    Thank you for registering for the PM Internship program. Your application has been submitted and saved to our database.
                </p>

                {/* Information Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>✓ Your data has been saved successfully</li>
                        <li>✓ Check your email for confirmation</li>
                        <li>✓ Monitor your dashboard for updates</li>
                        <li>✓ You will be notified about next steps</li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link
                        to="/home"
                        className="block w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-all shadow-md"
                    >
                        Return to Home
                    </Link>

                    <Link
                        to="/youth-form"
                        className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                    >
                        Submit Another Registration
                    </Link>
                </div>

                {/* Support Link */}
                <p className="text-xs text-gray-500 mt-6">
                    Need help? Contact us at{' '}
                    <a href="mailto:pminternship@mca.gov.in" className="text-orange-500 hover:underline">
                        pminternship@mca.gov.in
                    </a>
                </p>
            </div>
        </div>
    );
}
