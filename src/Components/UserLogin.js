import React, { useState } from 'react';
import OtpInput from './OtpInput';
import Icons from './Icons';
import { useAuth } from '../context/AuthContext'; // ✅ added

const UserLogin = ({ onLoginSuccess }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { login } = useAuth(); // ✅ added

  const validateMobile = () => {
    const cleaned = mobile.replace(/^(\+91|91)/, '');
    if (!cleaned.trim()) {
      setMessage('Please enter your mobile number');
      return false;
    }
    if (!/^\d{10}$/.test(cleaned)) {
      setMessage('Mobile number must be 10 digits');
      return false;
    }
    return true;
  };

  const handleSkip = () => {
    if (onLoginSuccess) onLoginSuccess(null);
  };

  const handleSendOtp = async () => {
    if (!validateMobile()) return;
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:4000/api/user/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: mobile }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setMessage('OTP Sent Successfully ✅');
      } else {
        setMessage(data.message || 'Failed to send OTP ❌');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

const handleVerifyOtp = async () => {
  if (!otp) {
    setMessage('Please enter the OTP');
    return;
  }
  setLoading(true);
  setMessage('');
  try {
    const response = await fetch('http://localhost:4000/api/user/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: mobile, otp }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage('OTP Verified ✅');

      // ✅ Save token and phone properly
      localStorage.setItem('token', data.token);
     // localStorage.setItem('mobileNumber', mobile);

      // ✅ Pass mobile number to context as well
      login(data.token, mobile);

      if (onLoginSuccess) onLoginSuccess(data.user);
    } else {
      setMessage(data.message || 'Invalid OTP ❌');
    }
  } catch (error) {
    console.error('Error:', error);
    setMessage('Server error. Please try again later.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden relative">
      {/* Skip Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleSkip}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Banner Image */}
      <img
        src="https://tendercuts.in/assets/images/intro-webp/4.webp"
        alt="Login Banner"
        className="w-full h-56 object-cover"
      />

      {/* Login Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <h2 className="text-xl font-semibold text-center mb-6">Login / Sign Up</h2>

        {message && (
          <div
            className={`text-sm mb-4 px-3 py-2 rounded ${otpSent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {message}
          </div>
        )}

        {!otpSent ? (
          <div className="space-y-4">
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              maxLength={10}
              disabled={loading}
              className="w-full border border-gray-300 rounded px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-red-400"
            />

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded text-lg font-semibold transition cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icons.Spinner className="animate-spin cursor-pointer" /> Sending...
                </span>
              ) : (
                'Continue'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-2">
              By signing in you agree to our{' '}
              <span className="text-red-500 underline cursor-pointer">Terms & Conditions</span> |{' '}
              <span className="text-red-500 underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
            <OtpInput length={6} onChange={setOtp} disabled={loading} />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-lg font-semibold transition"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full text-sm text-red-500 hover:underline"
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogin;