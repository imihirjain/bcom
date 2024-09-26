import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect URL from query parameters or default to '/user'
  const redirectUrl = new URLSearchParams(location.search).get('redirect') || '/user';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request body for the login API
    const loginData = {
      email,
      password,
    };

    try {
      // Make the API request
      const response = await fetch('https://bcom-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      // Parse the response
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        setSuccessMessage('Login successful! Redirecting...');
        setErrorMessage('');

        // Redirect to the specified URL (either `/cart` or `/user`)
        setTimeout(() => {
          navigate(redirectUrl);  // This will now correctly navigate to `/cart` if that's in the query parameter
        }, 1500);
      } else {
        // Display error message from server
        setErrorMessage(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Handle any errors from the request
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-600 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-600 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Success Message */}
        {successMessage && (
          <p className="mt-4 text-center text-green-500">{successMessage}</p>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p className="mt-4 text-center text-red-500">{errorMessage}</p>
        )}

        <p className="mt-6 text-center text-slate-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-slate-700 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
