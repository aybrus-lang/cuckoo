"use client";

type Notification = {
  id: number;
  creator: string;
  message: string;
  time: string;
  emoji: string;
  expiresAt: number;
};

type Invitation = {
  id: number;
  name: string;
  status: "invited" | "accepted" | "rejected";
};

type ReceiverViewProps = {
  invitations: Invitation[];
  acceptInvite: (id: number) => void;
  rejectInvite: (id: number) => void;
  hasAccess: boolean;
  notificationsByCreator: Record<string, Notification[]>;
  dismissNotification: (id: number) => void;
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
    <main style={{ padding: 20, maxWidth: 520, margin: "0 auto" }}>
      <h2>Receiver</h2>

      {/* Acceptance message */}
      {acceptedMessage && (
        <div
          style={{
            padding: 12,
            marginBottom: 16,
            borderRadius: 8,
            background: "#111",
            color: "white",
            textAlign: "center",
          }}
        >
          Access confirmed. You are now part of a privileged experience.
        </div>
      )}

      {/* Invitations */}
      {!hasAccess && (
        <div style={{ marginBottom: 20 }}>
          <h3>Invitations</h3>

          {invitations.length === 0 && <div>No invitations yet</div>}

          {invitations.map((invite) => (
            <div key={invite.id} style={{ marginBottom: 10 }}>
              {invite.name}
              {invite.status === "invited" && (
                <div style={{ marginTop: 4 }}>
                  <button onClick={() => acceptInvite(invite.id)}>
                    Accept
                  </button>
                  <button
                    onClick={() => rejectInvite(invite.id)}
                    style={{ marginLeft: 6 }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Notifications */}
      {hasAccess && (
        <div>
          <h3>Notifications</h3>

          {Object.keys(notificationsByCreator).length === 0 && (
            <div>No notifications yet</div>
          )}

          {Object.entries(notificationsByCreator).map(
            ([creator, notifications]) => (
              <div key={creator} style={{ marginBottom: 16 }}>
                <strong>{creator}</strong>

                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: 10,
                      marginTop: 6,
                      borderRadius: 8,
                      border: "1px solid #ddd",
                    }}
                  >
                    {n.emoji} {n.message}
                    <div style={{ fontSize: 12, opacity: 0.6 }}>{n.time}</div>
                    <button
                      onClick={() => dismissNotification(n.id)}
                      style={{ marginTop: 6 }}
                    >
                      Dismiss
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}
