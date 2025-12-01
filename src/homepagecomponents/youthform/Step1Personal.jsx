// src/homepagecomponents/registration/steps/Step1Personal.jsx
import React, { useState } from "react";

export default function Step1Personal({ data, update, next }) {
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [countdown, setCountdown] = useState(0);

  const onChange = (e) => update({ [e.target.name]: e.target.value });

  // Handle Send OTP
  const handleSendOTP = async () => {
    if (!data.mobile || data.mobile.length !== 10) {
      setMessage({ type: "error", text: "Please enter a valid 10-digit mobile number" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("https://sih-backend-4.onrender.com/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: data.mobile })
      });

      const result = await response.json();

      if (result.success) {
        setOtpSent(true);
        setMessage({ type: "success", text: result.message });

        // Start 30-second countdown for resend
        setCountdown(30);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        // Show OTP in console if in development
        if (result.otp) {
          console.log(`🔐 Development OTP: ${result.otp}`);
          alert(`Development Mode: Your OTP is ${result.otp}`);
        }
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to send OTP. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOTP = async () => {
    if (otpValue.length !== 6) {
      setMessage({ type: "error", text: "Please enter a valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("https://sih-backend-4.onrender.com/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: data.mobile, otp: otpValue })
      });

      const result = await response.json();

      if (result.success) {
        setOtpVerified(true);
        setMessage({ type: "success", text: "✅ Mobile number verified successfully!" });
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to verify OTP. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOTP = () => {
    setOtpValue("");
    setOtpVerified(false);
    setMessage({ type: "", text: "" });
    handleSendOTP();
  };

  // basic completion check for enabling Next
  const required = ["fullname", "fatherName", "dob", "gender", "mobile"];
  const isComplete = required.every((k) => data[k] && String(data[k]).trim().length > 0) && otpVerified;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4">Personal Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input
            name="fullname"
            value={data.fullname}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
            placeholder="Enter candidate full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Father / Mother / Guardian Name *</label>
          <input
            name="fatherName"
            value={data.fatherName}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
            placeholder="Parent / guardian name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
          <input
            name="dob"
            type="date"
            value={data.dob}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender *</label>
          <select
            name="gender"
            value={data.gender}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
          >
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={data.category}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
          >
            <option value="">Select category</option>
            <option>General</option>
            <option>OBC</option>
            <option>SC</option>
            <option>ST</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Differently Abled</label>
          <select
            name="differentlyAbled"
            value={data.differentlyAbled}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={onChange}
            className="mt-1 block w-full p-3 border rounded-lg"
            placeholder="you@example.com"
          />
        </div>

        {/* Mobile Number with OTP Verification */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
          <div className="flex gap-2 items-start">
            <div className="flex-1">
              <input
                name="mobile"
                value={data.mobile}
                onChange={(e) => {
                  update({ mobile: e.target.value.replace(/\D/g, "").slice(0, 10) });
                  // Reset OTP state if mobile changes
                  if (otpSent || otpVerified) {
                    setOtpSent(false);
                    setOtpVerified(false);
                    setOtpValue("");
                    setMessage({ type: "", text: "" });
                  }
                }}
                className={`mt-1 block w-full p-3 border rounded-lg ${otpVerified ? 'border-green-500 bg-green-50' :
                  otpSent ? 'border-yellow-500' : 'border-gray-300'
                  }`}
                placeholder="10-digit mobile number"
                disabled={otpVerified}
              />
            </div>

            {!otpVerified && (
              <button
                type="button"
                onClick={otpSent ? handleResendOTP : handleSendOTP}
                disabled={loading || data.mobile.length !== 10 || countdown > 0}
                className={`mt-1 px-4 py-3 rounded-lg font-semibold transition whitespace-nowrap ${loading || data.mobile.length !== 10 || countdown > 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
              >
                {loading ? '...' : otpSent ? `Resend${countdown > 0 ? ` (${countdown}s)` : ''}` : 'Send OTP'}
              </button>
            )}

            {otpVerified && (
              <div className="mt-1 flex items-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-sm">Verified</span>
              </div>
            )}
          </div>

          {/* Alternative Mobile */}
          <div className="mt-2">
            <input
              name="alternativeMobile"
              value={data.alternativeMobile}
              onChange={(e) => update({ alternativeMobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
              className="block w-full p-3 border rounded-lg"
              placeholder="Alternative mobile (optional)"
            />
          </div>
        </div>

        {/* OTP Input Field (shows after OTP sent) */}
        {otpSent && !otpVerified && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Enter OTP *</label>
            <div className="flex gap-2 items-start">
              <input
                type="text"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="mt-1 block w-full p-3 border rounded-lg font-mono text-center text-lg tracking-widest"
                placeholder="000000"
                maxLength={6}
                autoFocus
              />
              <button
                type="button"
                onClick={handleVerifyOTP}
                disabled={loading || otpValue.length !== 6}
                className={`mt-1 px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${loading || otpValue.length !== 6
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Enter the 6-digit OTP sent to your mobile</p>
          </div>
        )}

        {/* Message Display */}
        {message.text && (
          <div className={`md:col-span-2 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
            message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={next}
          disabled={!isComplete}
          className={`px-6 py-3 rounded-lg font-semibold transition ${isComplete ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          Save & Next →
        </button>
      </div>

      {!otpVerified && data.mobile.length === 10 && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          ⚠️ Please verify your mobile number to proceed
        </p>
      )}
    </div>
  );
}
