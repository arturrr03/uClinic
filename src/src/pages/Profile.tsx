import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = {
    name: "Richard Lahea",
    email: "richard.lahea@example.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Universitas Klabat No. 1, Airmadidi, Sulawesi Utara",
    avatar: "https://via.placeholder.com/150", // URL gambar avatar
  };

  const handleLogout = () => {
    // Lakukan logika logout di sini jika diperlukan (misalnya, membersihkan token)
    navigate('/login');
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 3,
            }}
          >
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Nomor Telepon:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.phone}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Alamat:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.address}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="primary">
              Edit Profil
            </Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;