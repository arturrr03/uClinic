import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database'; // Import fungsi untuk membaca data dari Realtime Database
import { database } from '../config/Firebase'; // Import konfigurasi Firebase
import unklabClinicLogo from '../../assets/unklab-clinic-logo.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth();

      // Konversi NIM menjadi pseudo-email
      const pseudoEmail = `${nip}@unklabclinic.com`;

      // Autentikasi dengan pseudo-email dan password
      const userCredential = await signInWithEmailAndPassword(auth, pseudoEmail, password);
      const user = userCredential.user;

      console.log('Login berhasil dengan NIP:', nip);

      // Periksa apakah pengguna terdaftar di dalam node users/admin
      const dbRef = ref(database, `users/admin/${user.uid}`);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        console.log('Pengguna ditemukan di dalam users/admin:', snapshot.val());
        navigate('/home'); // Navigasi ke halaman home setelah login berhasil
      } else {
        console.error('Pengguna tidak ditemukan di dalam users/admin.');
        alert('Anda tidak memiliki akses. Silakan hubungi admin.');
        await auth.signOut(); // Logout pengguna jika tidak terdaftar di users/admin
      }
    } catch (error) {
      console.error('Error saat login:', error);
      alert('Gagal login. Silakan periksa NIP dan password Anda.');
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
          <label htmlFor="nip" style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>
            NIP
          </label>
          <input
            type="text"
            id="nip"
            className="form-control"
            placeholder="Nomor Induk Pegawai"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
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