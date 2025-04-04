import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

interface RekamMedisItemProps {
  nama: string;
  keluhanList: string[];
  onLihatClick?: () => void;
  onTambahClick?: () => void;
}

const RekamMedisItem: React.FC<RekamMedisItemProps> = ({
  nama,
  keluhanList,
  onLihatClick,
  onTambahClick,
}) => (
  <Card
    sx={{
      mb: 2,
      backgroundColor: keluhanList.length === 0 ? "#ffe0b2" : "#f5f5f5",
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h6">{nama}</Typography>
        <Typography variant="body2" color="text.secondary">
          {keluhanList.length === 0
            ? "*Belum ada rekam medis"
            : keluhanList.join(", ")}
        </Typography>
      </Box>
      <Box>
        {keluhanList.length === 0 ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="small"
            onClick={onTambahClick}
          >
            Tambahkan
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<VisibilityIcon />}
            size="small"
            onClick={onLihatClick}
          >
            Lihat
          </Button>
        )}
      </Box>
    </CardContent>
  </Card>
);

const RekamMedisPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formNama, setFormNama] = useState("");
  const [rekamMedisData, setRekamMedisData] = useState([
    { nama: "Richard Lahea", keluhanList: ["Sakit kepala", "Demam"] },
    { nama: "Richard Lahea", keluhanList: ["Batuk"] },
    { nama: "Richard Lahea", keluhanList: ["Pilek"] },
    { nama: "John Doe", keluhanList: [] },
  ]);

  const [formData, setFormData] = useState({
    nama: "",
    gender: "",
    umur: "",
    keluhan: "",
  });

  const handleLihatClick = (nama: string) => {
    const data = rekamMedisData.find((item) => item.nama === nama);
    if (data) {
      setFormNama(nama);
      setFormData({
        nama: nama,
        gender: "",
        umur: "",
        keluhan: data.keluhanList.join(", "),
      });
      setShowForm(true);
    }
  };

  const handleFormSubmit = () => {
    if (formNama) {
      const updatedData = rekamMedisData.map((item) => {
        if (item.nama === formNama) {
          return {
            ...item,
            keluhanList: [...item.keluhanList, formData.keluhan],
          };
        }
        return item;
      });
      setRekamMedisData(updatedData);
    } else {
      setRekamMedisData([
        ...rekamMedisData,
        {
          nama: formData.nama,
          keluhanList: [formData.keluhan],
        },
      ]);
    }
    setShowForm(false);
    setFormData({ nama: "", gender: "", umur: "", keluhan: "" });
    setFormNama("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Rekam Medis
      </Typography>
      {showForm ? (
        <Card sx={{ mt: 2, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Formulir Rekam Medis - {formNama || formData.nama}
          </Typography>
          <TextField
            label="Nama"
            fullWidth
            margin="normal"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          />
          <TextField
            label="Gender"
            fullWidth
            margin="normal"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
          <TextField
            label="Umur"
            fullWidth
            margin="normal"
            value={formData.umur}
            onChange={(e) => setFormData({ ...formData, umur: e.target.value })}
          />
          <TextField
            label="Keluhan"
            fullWidth
            margin="normal"
            value={formData.keluhan}
            onChange={(e) =>
              setFormData({ ...formData, keluhan: e.target.value })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
            >
              Tambahkan
            </Button>
          </Box>
        </Card>
      ) : (
        <Box sx={{ mt: 2 }}>
          {rekamMedisData.map((item, index) => (
            <RekamMedisItem
              key={index}
              {...item}
              onLihatClick={() => handleLihatClick(item.nama)}
              onTambahClick={() => {
                setFormNama(item.nama);
                setShowForm(true);
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RekamMedisPage;
