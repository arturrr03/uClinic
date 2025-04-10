import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import unklabClinicLogo from '../../assets/unklab-clinic-logo.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [nim, setNim] = useState(''); // Changed from username to nim
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth();

      // Convert NIM to pseudo-email
      const pseudoEmail = `${nim}@unklabclinic.com`;

      // Authenticate with pseudo-email and password
      await signInWithEmailAndPassword(auth, pseudoEmail, password);

      console.log('Login successful with NIM:', nim);
      navigate('/home'); // Navigate to the home page after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to login. Please check your NIM and password.');
    }
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
          <label htmlFor="nim" style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>
            NIM
          </label>
          <input
            type="text"
            id="nim"
            className="form-control"
            placeholder="Nomor Induk Mahasiswa"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
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