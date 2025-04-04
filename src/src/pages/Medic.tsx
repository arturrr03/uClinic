import React, { useState } from "react";

const Medic = () => {
  const [patients, setPatients] = useState([
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

  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleAddRecord = (id, gender, age, description) => {
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

  const handleEditRecord = (id, gender, age, description) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              medicalRecord: { gender, age, description },
            }
          : patient
      )
    );
    setSelectedPatient(null);
  };

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <h1>
        Rekam <strong>Medis</strong>
      </h1>
      {selectedPatient ? (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>{selectedPatient.name}</h2>
          <p>{selectedPatient.complaint}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const gender = formData.get("gender");
              const age = formData.get("age");
              const description = formData.get("description");
              if (selectedPatient.hasMedicalRecord) {
                handleEditRecord(selectedPatient.id, gender, age, description);
              } else {
                handleAddRecord(selectedPatient.id, gender, age, description);
              }
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <label>Gender:</label>
              <input
                type="text"
                name="gender"
                defaultValue={
                  selectedPatient.medicalRecord
                    ? selectedPatient.medicalRecord.gender
                    : ""
                }
                required
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  width: "200px",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Umur:</label>
              <input
                type="number"
                name="age"
                defaultValue={
                  selectedPatient.medicalRecord
                    ? selectedPatient.medicalRecord.age
                    : ""
                }
                required
                style={{
                  marginLeft: "10px",
                  padding: "5px",
                  width: "200px",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Deskripsi sakit atau keluhan:</label>
              <textarea
                name="description"
                defaultValue={
                  selectedPatient.medicalRecord
                    ? selectedPatient.medicalRecord.description
                    : ""
                }
                required
                style={{
                  display: "block",
                  marginTop: "5px",
                  padding: "5px",
                  width: "100%",
                  height: "100px",
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {selectedPatient.hasMedicalRecord ? "Simpan" : "Tambahkan"}
            </button>
          </form>
        </div>
      ) : (
        <div>
          {patients.map((patient) => (
            <div
              key={patient.id}
              style={{
                backgroundColor: patient.hasMedicalRecord
                  ? "#f5f5f5"
                  : "#ffcccc",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{patient.name}</h3>
                <p>{patient.complaint}</p>
                {!patient.hasMedicalRecord && (
                  <p style={{ color: "red" }}>*Belum ada rekam medis</p>
                )}
              </div>
              <button
                onClick={() => setSelectedPatient(patient)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: patient.hasMedicalRecord
                    ? "#007bff"
                    : "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {patient.hasMedicalRecord ? "Lihat/Edit" : "Tambahkan"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Medic;
