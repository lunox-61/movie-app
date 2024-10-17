import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(''); // State untuk pesan error

  const handleLogin = () => {
    if (username.trim() === '') {
      setError('Username is required'); // Mengatur pesan error jika username kosong
      return;
    }

    localStorage.setItem('username', username);
    window.location.href = '/'; // Mengalihkan ke home page
  };

  const continueAsGuest = () => {
    window.location.href = '/';
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin(); 
    }
  };

  return (
    <>
    <Helmet>
      <title>Movie App - Login</title>
      <meta name="description" content="Login to Movie App to manage your favorite movies." />
    </Helmet>
    
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Input Username */}
        <input 
          type="text" 
          value={username} 
          onChange={e => {
            setUsername(e.target.value);
            setError(''); // Reset error jika pengguna mulai mengetik
          }} 
          onKeyDown={handleKeyDown} // Tambahkan event handler di sini
          placeholder="Enter your username" 
          className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded mb-4`}
        />

        {/* Tampilkan pesan error jika ada */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Tombol Login */}
        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Tombol Guest */}
        <button 
          onClick={continueAsGuest} 
          className="w-full mt-4 text-blue-500 hover:underline"
        >
          Continue as Guest
        </button>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
