"use client";

import { Notification, Invitation } from "../lib/types";

type ReceiverViewProps = {
  invitations: Invitation[];
  acceptInvite: (id: string) => void;
  rejectInvite: (id: string) => void;
  hasAccess: boolean;
  notificationsByCreator: Record<string, Notification[]>;
  dismissNotification: (id: string) => void;
  acceptedMessage: string | null;
  now: number;
};

export default function ReceiverView({
  invitations,
  acceptInvite,
  rejectInvite,
  hasAccess,
  notificationsByCreator,
  dismissNotification,
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

      {/* === PRE-ACCEPT ONBOARDING === */}
      {!hasAccess && (
        <div
          style={{
            padding: 20,
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 28,
          }}
        >
          <h3>You’ve been invited.</h3>

          <p style={{ opacity: 0.8, lineHeight: 1.5 }}>
            You were selected to be included in private moments.
            <br />
            Access is limited.
            <br />
            Participation is optional.
          </p>
        </div>
      )}

      {/* === INVITATIONS === */}
      {!hasAccess && (
        <div style={{ marginBottom: 28 }}>
          {invitations.length === 0 && (
            <p style={{ opacity: 0.6 }}>Your access has not been activated.</p>
          )}

          {invitations.map((invite) => (
            <div key={invite.id} style={{ marginBottom: 12 }}>
              <span>
                {invite.name} — {invite.status}
              </span>

              {invite.status === "invited" && (
                <div style={{ marginTop: 6 }}>
                  <button className="luxury-btn" onClick={() => acceptInvite(invite.id)}>
                    Accept
                  </button>
                  <button
                    className="luxury-btn"
                    onClick={() => rejectInvite(invite.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* === ACCEPTED STATE === */}
      {hasAccess && (
        <div>
          {acceptedMessage && (
  <div
    style={{
      marginBottom: 24,
      padding: 20,
      borderRadius: 12,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.15)",
      textAlign: "center",
      animation: "fadeReveal 0.8s ease",
    }}
  >
    <div style={{ fontSize: 18, marginBottom: 6 }}>
      Privileged access granted.
    </div>

    <div style={{ opacity: 0.75, lineHeight: 1.5 }}>
      You are now included in moments chosen for you.
      <br />
      This access exists because you were selected.
    </div>
  </div>
)}


          {Object.entries(notificationsByCreator).map(([creator, notes]) => (
            <div key={creator}>
              <h3 style={{ marginBottom: 12 }}>
                You are witnessing something you were chosen to know.
              </h3>

              {notes.length === 0 && (
                <p style={{ opacity: 0.6 }}>Nothing has been shared yet.</p>
              )}

              {notes.map((note) => (
                <div
  key={note.id}
  style={{
    marginBottom: 14,
    padding: 18,
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    animation: "fadeReveal 0.5s ease",
  }}

                >
                  <div>{note.message}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    {new Date(note.expiresAt).toLocaleString()}
                  </div>

                  <button
                    className="luxury-btn"
                    onClick={() => dismissNotification(note.id)}
                    style={{ marginTop: 6 }}
                  >
                    Dismiss
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
