import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

interface Patient {
  id: number;
  name: string;
  complaint: string;
  hasMedicalRecord: boolean;
  medicalRecord: {
    gender: string;
    age: number;
    description: string;
  } | null;
}

const PatientCard: React.FC<{
  patient: Patient;
  onEdit: (patient: Patient) => void;
}> = ({ patient, onEdit }) => (
  <Card
    sx={{
      mb: 2,
      backgroundColor: patient.hasMedicalRecord ? "#f5f5f5" : "#ffcccc",
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
        <Typography variant="body2" color="text.secondary">
          {patient.complaint}
        </Typography>
        {!patient.hasMedicalRecord && (
          <Typography variant="body2" color="error">
            *Belum ada rekam medis
          </Typography>
        )}
      </Box>
      <Button
        variant={patient.hasMedicalRecord ? "outlined" : "contained"}
        color={patient.hasMedicalRecord ? "primary" : "success"}
        onClick={() => onEdit(patient)}
      >
        {patient.hasMedicalRecord ? "Lihat/Edit" : "Tambahkan"}
      </Button>
    </CardContent>
  </Card>
);

const MedicalRecordForm: React.FC<{
  patient: Patient;
  onSave: (
    id: number,
    gender: string,
    age: number,
    description: string
  ) => void;
  onCancel: () => void;
}> = ({ patient, onSave, onCancel }) => {
  const [gender, setGender] = useState(patient.medicalRecord?.gender || "");
  const [age, setAge] = useState(patient.medicalRecord?.age || 0);
  const [description, setDescription] = useState(
    patient.medicalRecord?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(patient.id, gender, age, description);
  };

  return (
    <Card sx={{ mt: 2, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {patient.hasMedicalRecord
          ? `Edit Rekam Medis - ${patient.name}`
          : `Tambah Rekam Medis - ${patient.name}`}
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
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Richard Lahea",
      complaint: "Keluhan sakit",
      hasMedicalRecord: true,
      medicalRecord: {
        gender: "Male",
        age: 30,
        description: "Sakit kepala berkepanjangan",
      },
    },
    {
      id: 2,
      name: "John Doe",
      complaint: "Keluhan sakit",
      hasMedicalRecord: false,
      medicalRecord: null,
    },
  ]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleSaveRecord = (
    id: number,
    gender: string,
    age: number,
    description: string
  ) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              hasMedicalRecord: true,
              medicalRecord: { gender, age, description },
            }
          : patient
      )
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
