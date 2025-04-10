import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { ref, onValue, update } from "firebase/database";
import { database } from "../config/Firebase";

interface Appointment {
  id: string;
  uid: string;
  fullName: string;
  gender: string;
  date: string;
  age?: string;
  description?: string;
  status?: string;
}

const Schedule: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const dbRef = ref(database, "users/mahasiswa");

    onValue(dbRef, (snapshot) => {
      if (!snapshot.exists()) {
        console.warn("❌ Tidak ada data di path 'users/mahasiswa'");
        setAppointments([]);
        return;
      }

      const data = snapshot.val();
      const result: Appointment[] = [];

      Object.entries(data).forEach(([uid, userData]: any) => {
        const records = userData?.record;
        if (records) {
          Object.entries(records).forEach(([recordId, record]: any) => {
            if (record.status !== "done") {
              const appointment: Appointment = {
                id: recordId,
                uid: uid,
                fullName: record.fullName || "Tanpa Nama",
                gender: record.gender || "-",
                date: record.date || "-",
                age: record.age || "-",
                description: record.description || "-",
                status: record.status || "-",
              };
              result.push(appointment);
            }
          });
        }
      });

      setAppointments(result);
    }, (error) => {
      console.error("🔥 Gagal membaca data:", error);
      setAppointments([]);
    });
  }, []);

  const handleConfirm = (appointment: Appointment) => {
    const path = `users/mahasiswa/${appointment.uid}/record/${appointment.id}`;
    const dbRef = ref(database, path);

    update(dbRef, { status: "done" })
      .then(() => {
        console.log(`✅ Status record ${appointment.id} berhasil diubah menjadi 'done'`);
        setAppointments((prev) =>
          prev.filter((a) => a.id !== appointment.id)
        );
      })
      .catch((err) => {
        console.error("❌ Gagal update status:", err);
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Semua Record Mahasiswa
      </Typography>

      {appointments.length === 0 ? (
        <Typography>Tidak ada data yang ditemukan.</Typography>
      ) : (
        appointments.map((appt) => (
          <Card key={appt.id} sx={{ mb: 2, p: 1 }}>
            <CardContent>
              <Typography variant="h6">{appt.fullName}</Typography>
              <Typography variant="body2">UID: {appt.uid}</Typography>
              <Typography variant="body2">Gender: {appt.gender}</Typography>
              <Typography variant="body2">Tanggal: {appt.date}</Typography>
              <Typography variant="body2">Deskripsi: {appt.description}</Typography>
              <Typography variant="body2">Status: {appt.status}</Typography>

              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleConfirm(appt)}
                >
                  Konfirmasi
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Schedule;
