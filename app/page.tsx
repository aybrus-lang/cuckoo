"use client";

export default function HomePage() {
  return (
    <main style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.headline}>Give access to the chosen few.</h1>

        <p style={styles.subheadline}>
          Cuckoo lets you invite, notify, and include selected people in
          real-time experiences — privately and on your terms.
        </p>

        <button style={styles.primaryButton}>
          Start Sending
        </button>

        <p style={styles.subtle}>
          Private. Intentional. Invitation-only.
        </p>
      </section>

      {/* WHAT IT IS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Inclusion without proximity
        </h2>

        <p style={styles.text}>
          Cuckoo allows you to share moments with selected people in real time —
          wherever they are.
        </p>

        <ul style={styles.list}>
          <li>You decide who receives access</li>
          <li>You decide when inclusion happens</li>
          <li>Nothing is public. Nothing is automatic</li>
        </ul>

        <p style={styles.text}>
          Presence is optional. Access is intentional.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>
          Invite → Include → Control
        </h2>

        <div style={styles.steps}>
          <div style={styles.step}>
            <h3>Invite selectively</h3>
            <p>Choose who receives access. Invitations are private.</p>
          </div>

          <div style={styles.step}>
            <h3>Share in real time</h3>
            <p>Send notifications when you decide to include them.</p>
          </div>

          <div style={styles.step}>
            <h3>Maintain control</h3>
            <p>You control timing, access, and visibility at all times.</p>
          </div>
        </div>

        <p style={styles.textCenter}>
          No feeds. No algorithms. Only chosen recipients.
        </p>
      </section>

      {/* WHO IT'S FOR */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Designed for intentional connection
        </h2>

        <ul style={styles.list}>
          <li>Creators who reward select followers</li>
          <li>Partners sharing presence across distance</li>
          <li>People who value controlled, private inclusion</li>
        </ul>

        <p style={styles.text}>
          If access matters, Cuckoo exists for that moment.
        </p>
      </section>

      {/* PRIVACY */}
      <section style={styles.sectionAlt}>
        <h2 style={styles.sectionTitle}>Private by design</h2>

        <ul style={styles.list}>
          <li>Invitation-only access</li>
          <li>No public profiles</li>
          <li>No discovery</li>
          <li>No broadcasting</li>
          <li>No algorithmic distribution</li>
        </ul>

        <p style={styles.textCenter}>
          Every interaction happens because someone chose it.
        </p>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.sectionTitle}>Create your circle</h2>

        <p style={styles.textCenter}>
          Choose who receives access. Decide when inclusion happens.
        </p>

        <button style={styles.primaryButton}>
          Start Sending
        </button>
      </section>

      <footer style={styles.footer}>
        Connection doesn’t require proximity.
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "system-ui, sans-serif",
    lineHeight: 1.5,
    color: "#111",
    maxWidth: 720,
    margin: "0 auto",
    padding: "24px 16px 40px",
  },

  hero: {
    textAlign: "center",
    marginBottom: 48,
  },

  headline: {
    fontSize: "clamp(28px, 5vw, 40px)",
    fontWeight: 600,
    marginBottom: 12,
  },

  subheadline: {
    fontSize: 18,
    opacity: 0.85,
    marginBottom: 20,
  },

  primaryButton: {
    padding: "14px 22px",
    fontSize: 16,
    borderRadius: 10,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    marginBottom: 12,
  },

  subtle: {
    fontSize: 13,
    opacity: 0.6,
  },

  section: {
    marginBottom: 48,
  },

  sectionAlt: {
    marginBottom: 48,
    padding: 20,
    borderRadius: 14,
    background: "#f6f6f6",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 12,
  },

  text: {
    marginBottom: 12,
    opacity: 0.9,
  },

  textCenter: {
    textAlign: "center",
    opacity: 0.9,
  },

  list: {
    paddingLeft: 18,
    marginBottom: 12,
  },

  steps: {
    display: "grid",
    gap: 16,
    marginBottom: 12,
  },

  step: {
    padding: 12,
    borderRadius: 10,
    background: "#fff",
  },

  cta: {
    textAlign: "center",
    marginTop: 40,
  },

  footer: {
    textAlign: "center",
    marginTop: 48,
    fontSize: 14,
    opacity: 0.6,
  },
};
