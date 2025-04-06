import React from "react";

const Home = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e6f7ff, #ffffff)",
      }}
    >
      <header
        style={{
          background: "linear-gradient(to right, #007bff, #0056b3)",
          color: "#fff",
          padding: "20px 0",
          borderRadius: "8px",
          marginBottom: "20px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2.5rem" }}>U-Clinic</h1>
        <p style={{ margin: 0, fontSize: "1.2rem" }}>
          Pelayanan Kesehatan Terbaik untuk Mahasiswa dan Staf
        </p>
      </header>

      <main
        style={{
          flex: 1,
          padding: "20px",
          textAlign: "center",
        }}
      >
        <section
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            marginBottom: "30px",
            transition: "transform 0.3s",
          }}
        >
          <h2 style={{ color: "#007bff", fontSize: "2rem" }}>Tentang Kami</h2>
          <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
            Klinik Universitas Klabat menyediakan layanan kesehatan yang
            profesional dan ramah untuk mahasiswa, staf, dan masyarakat sekitar.
            Kami berkomitmen untuk memberikan pelayanan terbaik dengan fasilitas
            modern dan tenaga medis yang berpengalaman.
          </p>
        </section>

        <section
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {[
            {
              title: "Layanan Medis",
              description:
                "Kami menyediakan layanan konsultasi kesehatan, pemeriksaan umum, dan pengobatan untuk berbagai keluhan.",
              icon: "🩺",
            },
            {
              title: "Jadwal Dokter",
              description:
                "Temui dokter kami sesuai jadwal yang telah ditentukan. Kami memastikan Anda mendapatkan pelayanan tepat waktu.",
              icon: "📅",
            },
            {
              title: "Fasilitas",
              description:
                "Klinik kami dilengkapi dengan fasilitas modern untuk mendukung pemeriksaan dan pengobatan yang akurat.",
              icon: "🏥",
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#e6f0ff",
                padding: "20px",
                borderRadius: "12px",
                width: "300px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 6px 12px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
                {feature.icon}
              </div>
              <h3 style={{ color: "#007bff", fontSize: "1.5rem" }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      <footer
        style={{
          padding: "15px 0",
          background: "linear-gradient(to right, #007bff, #0056b3)",
          color: "#fff",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p style={{ margin: 0, fontSize: "1rem" }}>© 2025 U-Clinic.</p>
      </footer>
    </div>
  );
};

export default Home;
