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
        background: "radial-gradient(circle at 50% 20%, #1a1a1a 0%, #0a0a0a 60%)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <h1 style={{ fontSize: 26, marginBottom: 6 }}>Receiver</h1>
        <p style={{ opacity: 0.6, marginBottom: 24 }}>
          You are part of a privileged experience.
        </p>

        {acceptedMessage && (
          <div
            style={{
              padding: 16,
              borderRadius: 12,
              marginBottom: 20,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {acceptedMessage}
          </div>
        )}

        <h3 style={{ marginBottom: 12 }}>Invitations</h3>

        {invitations.length === 0 && (
          <p style={{ opacity: 0.5 }}>No invitations yet</p>
        )}

        {invitations.map((invite) => (
          <div
            key={invite.id}
            style={{
              padding: 16,
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 12,
            }}
          >
            <div style={{ marginBottom: 12 }}>
              {invite.name} invited you
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => acceptInvite(invite.id)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Accept
              </button>

              <button
                onClick={() => rejectInvite(invite.id)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                }}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
