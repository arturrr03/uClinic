import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import unklabClinicLogo from '../../assets/unklab-clinic-logo.png'; 

const Regis: React.FC = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    // Lakukan logika pendaftaran akun di sini
    console.log('Creating account with:', { nama, nim, email, password });

    // Setelah berhasil membuat akun, arahkan ke halaman login
    navigate('/');
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa', 
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img src={unklabClinicLogo} alt="UNKLAB CLINIC Logo" style={{ maxWidth: '200px', marginBottom: '10px' }} />
        <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>Aplikasi Klinik Universitas Klabat</p>
      </div>

      <div style={{ width: '100%', maxWidth: '300px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nama" style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>
            Nama
          </label>
          <input
            type="text"
            id="nama"
            className="form-control"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={inputStyle}
          />
        </div>
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
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Alamat Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
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
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handleCreateAccount}
          style={buttonStyle}
        >
          Create
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center', color: '#6c757d', fontSize: '0.9rem' }}>
          Sudah punya akun? <a href="#" onClick={handleBackToLogin} style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer' }}>Login disini</a>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ced4da',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '10px 15px',
  borderRadius: '5px',
  backgroundColor: '#92BEFD',
  color: '#fff',
  border: 'none',
  fontSize: '1rem',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

export default Regis;