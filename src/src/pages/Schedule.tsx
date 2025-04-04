import React, { useState } from "react";

const Schedule = () => {
  const [appointments, setAppointments] = useState([
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
      name: "Richard Lahea",
      complaint: "Keluhan sakit",
      time: "--:-- WITA",
      date: "---/--/----",
      description: "",
      status: "pending",
    },
    {
      id: 3,
      name: "Richard Lahea",
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>
        Konfirmasi <strong>Jadwal</strong>
      </h1>
      <div>
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            style={{
              border:
                appointment.status === "scheduled"
                  ? "2px solid green"
                  : "2px solid #ccc",
              backgroundColor:
                appointment.status === "scheduled" ? "#b2f5b2" : "#f5f5f5",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <h3>{appointment.name}</h3>
              <p>{appointment.complaint}</p>
            </div>
            <div>
              <p>Tanggal: {appointment.date}</p>
              <p>Jam: {appointment.time}</p>
              <p>
                Deskripsi: {appointment.description || "Belum ada deskripsi"}
              </p>
            </div>
            {appointment.status === "pending" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const date = formData.get("date") as string;
                  const time = formData.get("time") as string;
                  const description = formData.get("description") as string;
                  handleSchedule(appointment.id, date, time, description);
                }}
                style={{ marginTop: "10px" }}
              >
                <input
                  type="date"
                  name="date"
                  required
                  style={{ marginRight: "10px", padding: "5px" }}
                />
                <input
                  type="time"
                  name="time"
                  required
                  style={{ marginRight: "10px", padding: "5px" }}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Deskripsi"
                  required
                  style={{ marginRight: "10px", padding: "5px" }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Atur Jadwal
                </button>
              </form>
            ) : (
              <span
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  borderRadius: "4px",
                  marginTop: "10px",
                }}
              >
                Terjadwal
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
