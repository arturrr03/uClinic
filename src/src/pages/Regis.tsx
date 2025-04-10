import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import unklabClinicLogo from '../../assets/unklab-clinic-logo.png'; 
import { auth } from "../config/Firebase"; // Import auth dari Firebase
import { database } from "../config/Firebase"; // Import database
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database"; // Import fungsi untuk Realtime Database

const Regis: React.FC = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!nama || !nim || !email || !password) {
      alert('Semua field harus diisi.');
      return;
    }

    if (!/^\d+$/.test(nim)) {
      alert('NIM hanya boleh berisi angka.');
      return;
    }

    if (password.length < 6) {
      alert('Password harus memiliki minimal 6 karakter.');
      return;
    }

    try {
      // Konversi NIM menjadi pseudo-email
      const pseudoEmail = `${nim}@unklabclinic.com`;

      console.log("Mencoba membuat akun dengan email:", pseudoEmail);

      // Buat akun menggunakan Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, pseudoEmail, password);
      const user = userCredential.user;

      console.log("Akun berhasil dibuat. UID:", user.uid);

      // Simpan data pengguna ke Firebase Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        nama: nama,
        nim: nim,
        email: email,
        createdAt: new Date().toISOString(), // Tambahkan timestamp
      });

      console.log("Data pengguna berhasil disimpan ke Realtime Database.");

      // Feedback bahwa akun berhasil dibuat
      alert('Akun berhasil dibuat! Anda sekarang dapat login.');
      navigate('/'); // Redirect ke halaman login
    } catch (err: any) {
      console.error('Error saat membuat akun:', err);

      // Tangani error spesifik dari Firebase
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('NIM ini sudah terdaftar.');
          break;
        case 'auth/weak-password':
          setError('Password harus memiliki minimal 6 karakter.');
          break;
        case 'auth/invalid-email':
          setError('Format NIM tidak valid.');
          break;
        default:
          setError('Gagal membuat akun. Silakan coba lagi.');
      }
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
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