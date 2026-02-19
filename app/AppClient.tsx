return (
  <main
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background:
        "radial-gradient(circle at 50% 30%, #1a1a1a 0%, #0a0a0a 60%)",
      color: "white",
      textAlign: "center",
    }}
  >
    <div
      style={{
        maxWidth: 520,
        width: "100%",
        padding: 32,
        borderRadius: 18,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          fontSize: 42,
          marginBottom: 12,
          opacity: 0.9,
        }}
      >
        🐦
      </div>

      <h1
        style={{
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          marginBottom: 16,
        }}
      >
        Give access to the chosen few.
      </h1>

      <p
        style={{
          fontSize: 16,
          lineHeight: 1.6,
          opacity: 0.7,
          marginBottom: 30,
        }}
      >
        Cuckoo lets you invite, notify, and include selected people in
        real-time experiences — privately and on your terms.
      </p>

      <button
        onClick={() => setMode("sender")}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.15)",
          fontSize: 16,
          fontWeight: 500,
          background: "rgba(255,255,255,0.08)",
          color: "white",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.color = "black";
          e.currentTarget.style.boxShadow =
            "0 0 20px rgba(255,255,255,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.color = "white";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Start Sending
      </button>

      <div
        style={{
          marginTop: 24,
          fontSize: 13,
          opacity: 0.45,
          letterSpacing: "0.08em",
        }}
      >
        PRIVATE • SELECTIVE • INTENTIONAL
      </div>
    </div>
  </main>
);
