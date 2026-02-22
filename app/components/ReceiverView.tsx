"use client";

type Invitation = {
  id: number;
  name: string;
  status: "invited" | "accepted" | "rejected";
};

type ReceiverViewProps = {
  invitations: Invitation[];
  acceptInvite: (id: number) => void;
  rejectInvite: (id: number) => void;
  acceptedMessage?: string;
};

export default function ReceiverView({
  invitations,
  acceptInvite,
  rejectInvite,
  acceptedMessage,
}: ReceiverViewProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #111 0%, #050505 60%)",
        color: "white",
        padding: "32px 20px",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: 6 }}>Receiver</h1>

      <p style={{ opacity: 0.7, marginBottom: 28 }}>
        You’ve been granted privileged access.
      </p>

      {acceptedMessage && (
        <div className="acceptance-reveal">
          {acceptedMessage}
        </div>
      )}

      <h3 style={{ marginBottom: 14, opacity: 0.85 }}>
        Invitations
      </h3>

      {invitations.length === 0 && (
        <p style={{ opacity: 0.6 }}>No invitations yet</p>
      )}

      {invitations.map((invite) => (
        <div key={invite.id} className="luxury-card">
          <div className="luxury-card-title">
            Invitation
          </div>

          <div className="luxury-card-body">
            <strong>{invite.name}</strong>
          </div>

          <div style={{ opacity: 0.6, fontSize: 13, marginTop: 6 }}>
            Status: {invite.status}
          </div>

          {invite.status === "invited" && (
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button
                className="luxury-btn primary pulse"
                onClick={() => acceptInvite(invite.id)}
                style={{ flex: 1 }}
              >
                Accept
              </button>

              <button
                className="luxury-btn"
                onClick={() => rejectInvite(invite.id)}
                style={{ flex: 1 }}
              >
                Decline
              </button>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
