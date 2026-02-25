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
  now,
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

      {!hasAccess && (
        <div style={{ marginBottom: 28 }}>
          <h3>You have been invited</h3>
          {invitations.length === 0 && <p style={{ opacity: 0.6 }}>No invitations yet</p>}
          {invitations.map((invite) => (
            <div key={invite.id} style={{ marginBottom: 12 }}>
              <span>
                {invite.name} — {invite.status}
              </span>
              {invite.status === "invited" && (
                <div style={{ marginTop: 4 }}>
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

      {hasAccess && (
        <div>
          {acceptedMessage && (
            <div className="luxury-btn pulse" style={{ marginBottom: 20 }}>
              {acceptedMessage}
            </div>
          )}

          {Object.entries(notificationsByCreator).map(([creator, notes]) => (
            <div key={creator} style={{ marginBottom: 20 }}>
              <h3>{creator}'s moments</h3>
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="luxury-btn"
                  style={{ display: "block", marginBottom: 10, padding: 14 }}
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
