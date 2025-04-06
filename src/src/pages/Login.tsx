import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import unklabClinicLogo from '../../assets/unklab-clinic-logo.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lakukan logika otentikasi di sini
    // Misalnya, periksa username dan password
    console.log('Logging in with:', username, password);

    // Jika login berhasil, arahkan ke halaman utama
    navigate('/home');
  };

  const handleRegis = () => {
    navigate('/regis');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa', // Background light gray
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img src={unklabClinicLogo} alt="UNKLAB CLINIC Logo" style={{ maxWidth: '200px', marginBottom: '10px' }} />
        <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>Aplikasi Klinik Universitas Klabat</p>
      </div>
      <div style={{ width: '100%', maxWidth: '300px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ced4da',
              fontSize: '1rem',
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ced4da',
              fontSize: '1rem',
            }}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '10px 15px',
            borderRadius: '5px',
            backgroundColor: '#92BEFD',
            color: '#fff',
            border: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Login
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center', color: '#6c757d', fontSize: '0.9rem' }}>
          Belum punya akun? <a href="#" onClick={handleRegis} style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer' }}>daftar disini</a>
        </div>
      </div>
    </div>
  );
};

export default Login;