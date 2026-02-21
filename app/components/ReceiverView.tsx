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
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 10,
            marginBottom: 24,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {acceptedMessage}
        </div>
      )}

      <h3 style={{ marginBottom: 12, opacity: 0.85 }}>Invitations</h3>

      {invitations.length === 0 && (
        <p style={{ opacity: 0.6 }}>No invitations yet</p>
      )}

      {invitations.map((invite) => (
        <div
          key={invite.id}
          style={{
            padding: "16px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 14,
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <strong>{invite.name}</strong>
            <div style={{ opacity: 0.6, fontSize: 13 }}>
              Status: {invite.status}
            </div>
          </div>

          {invite.status === "invited" && (
            <div style={{ display: "flex", gap: 10 }}>
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
