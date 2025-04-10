import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Chip,
} from "@mui/material";
import { ref, onValue } from "firebase/database";
import { database } from "../config/Firebase";

interface Patient {
  id: string;
  uid: string;
  name: string;
  complaint: string;
  gender: string;
  age: number;
  description: string;
}

const PatientCard: React.FC<{
  patient: Patient;
  onEdit: (patient: Patient) => void;
}> = ({ patient, onEdit }) => (
  <Card
    sx={{
      mb: 2,
      backgroundColor: "#f1f5f9",
      borderLeft: "5px solid #4caf50", // garis hijau pinggir kiri
      boxShadow: 2,
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
        <Typography variant="h6">{patient.name}</Typography>
        <Chip
          label="Done"
          color="success"
          size="small"
          sx={{ mt: 1 }}
        />
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onEdit(patient)}
      >
        LIHAT
      </Button>
    </CardContent>
  </Card>
);

const MedicalRecordForm: React.FC<{
  patient: Patient;
  onSave: (p: Patient) => void;
  onCancel: () => void;
}> = ({ patient, onSave, onCancel }) => {
  const [gender, setGender] = useState(patient.gender);
  const [age, setAge] = useState(patient.age);
  const [description, setDescription] = useState(patient.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...patient,
      gender,
      age,
      description,
    });
  };

  return (
    <Card sx={{ mt: 2, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Rekam Medis - {patient.name}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Gender"
          fullWidth
          margin="normal"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        />
        <TextField
          label="Umur"
          type="number"
          fullWidth
          margin="normal"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
        />
        <TextField
          label="Deskripsi"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onCancel}
            sx={{ mr: 2 }}
          >
            Batal
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Simpan
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

const Medic: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const mahasiswaRef = ref(database, "users/mahasiswa");

    onValue(mahasiswaRef, (snapshot) => {
      if (!snapshot.exists()) {
        console.warn("❌ Tidak ada data mahasiswa.");
        return;
      }

      const data = snapshot.val();
      const result: Patient[] = [];

      Object.entries(data).forEach(([uid, userData]: any) => {
        const records = userData?.record;
        if (records) {
          Object.entries(records).forEach(([recordId, record]: any) => {
            if (record.status === "done") {
              result.push({
                id: recordId,
                uid: uid,
                name: record.fullName || "Tanpa Nama",
                complaint: record.complaint || "-",
                gender: record.gender || "-",
                age: parseInt(record.age) || 0,
                description: record.description || "-",
              });
            }
          });
        }
      });

      setPatients(result);
    });
  }, []);

  const handleSaveRecord = (updatedPatient: Patient) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setSelectedPatient(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Rekam Medis
      </Typography>
      {selectedPatient ? (
        <MedicalRecordForm
          patient={selectedPatient}
          onSave={handleSaveRecord}
          onCancel={() => setSelectedPatient(null)}
        />
      ) : (
        <Box sx={{ mt: 2 }}>
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={setSelectedPatient}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Medic;
