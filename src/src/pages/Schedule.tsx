import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

interface Appointment {
  id: number;
  name: string;
  complaint: string;
  time: string;
  date: string;
  description: string;
  status: string;
}

const Schedule: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      name: "Richard Lahea",
      complaint: "Keluhan sakit",
      time: "--:-- WITA",
      date: "---/--/----",
      description: "",
      status: "pending",
    },
    {
      id: 2,
      name: "John Doe",
      complaint: "Keluhan sakit",
      time: "--:-- WITA",
      date: "---/--/----",
      description: "",
      status: "pending",
    },
    {
      id: 3,
      name: "Jane Smith",
      complaint: "Keluhan sakit",
      time: "--:-- WITA",
      date: "---/--/----",
      description: "",
      status: "pending",
    },
  ]);

  const handleSchedule = (
    id: number,
    date: string,
    time: string,
    description: string
  ) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "scheduled", date, time, description }
          : appointment
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Konfirmasi Jadwal
      </Typography>
      <Box>
        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            sx={{
              mb: 2,
              border:
                appointment.status === "scheduled"
                  ? "2px solid green"
                  : "2px solid #ccc",
              backgroundColor:
                appointment.status === "scheduled" ? "#b2f5b2" : "#f5f5f5",
            }}
          >
            <CardContent>
              <Typography variant="h6">{appointment.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {appointment.complaint}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Tanggal: {appointment.date}
              </Typography>
              <Typography variant="body2">Jam: {appointment.time}</Typography>
              <Typography variant="body2">
                Deskripsi: {appointment.description || "Belum ada deskripsi"}
              </Typography>
              {appointment.status === "pending" ? (
                <Box
                  component="form"
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const date = formData.get("date") as string;
                    const time = formData.get("time") as string;
                    const description = formData.get("description") as string;
                    handleSchedule(appointment.id, date, time, description);
                  }}
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: "400px", // Membatasi lebar form
                  }}
                >
                  <TextField
                    name="date"
                    type="date"
                    required
                    margin="normal"
                    label="Tanggal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    name="time"
                    type="time"
                    required
                    margin="normal"
                    label="Jam"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    name="description"
                    type="text"
                    required
                    margin="normal"
                    label="Deskripsi"
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Atur Jadwal
                  </Button>
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    p: 1,
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  Terjadwal
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Schedule;
