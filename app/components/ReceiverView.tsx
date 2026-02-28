"use client";

import { Notification, Invitation } from "../lib/types";

type Props = {
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
}: Props) {
  const pendingInvites = invitations.filter(
    (i) => i.status === "invited"
  );

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2 style={{ marginBottom: 20 }}>Receiver</h2>

      {/* =========================
         Onboarding / Invitation
      ========================= */}
      {!hasAccess && (
        <div
          style={{
            padding: 18,
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 24,
            maxWidth: 420,
          }}
        >
          <div style={{ fontSize: 16, marginBottom: 12 }}>
            You’ve been invited.
          </div>

          <div style={{ opacity: 0.7, marginBottom: 14 }}>
            You were selected to be included in private moments.
            Access is limited. Participation is optional.
          </div>

          {pendingInvites.map((invite) => (
            <div key={invite.id} style={{ marginBottom: 10 }}>
              <button
                className="luxury-btn"
                onClick={() => acceptInvite(invite.id)}
                style={{ marginRight: 8 }}
              >
                Accept
              </button>

              <button
                className="luxury-btn"
                onClick={() => rejectInvite(invite.id)}
              >
                Decline
              </button>
            </div>
          ))}

          {!pendingInvites.length && (
            <div style={{ opacity: 0.6 }}>
              Your access has not been activated.
            </div>
          )}
        </div>
      )}

      {/* =========================
         Acceptance confirmation
      ========================= */}
      {acceptedMessage && (
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            marginBottom: 20,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            animation: "fadeIn 0.4s ease",
          }}
        >
          {acceptedMessage}
        </div>
      )}

      {/* =========================
         Moments feed
      ========================= */}
      {hasAccess && (
        <div>
          <h3 style={{ marginBottom: 14 }}>Moments</h3>

          {Object.entries(notificationsByCreator).map(
            ([creator, notifications]) => (
              <div key={creator}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 12,
                      marginBottom: 12,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",

                      animation:
                        "momentIn 0.6s ease, momentGlow 1.8s ease",
                    }}
                  >
                    <div>
                      <strong>
                        {n.symbol ? `${n.symbol} ` : ""}
                        {n.creator}:
                      </strong>{" "}
                      {n.message}
                      <span
                        style={{
                          opacity: 0.6,
                          fontSize: 12,
                          marginLeft: 8,
                        }}
                      >
                        {new Date(n.expiresAt).toLocaleTimeString()}
                      </span>
                    </div>

                    <button
                      className="luxury-btn"
                      style={{ marginTop: 8 }}
                      onClick={() => dismissNotification(n.id)}
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

      {/* =========================
         Animations
      ========================= */}
      <style jsx global>{`
        @keyframes momentIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes momentGlow {
          0% {
            box-shadow: 0 0 0px rgba(255, 80, 80, 0);
          }
          40% {
            box-shadow: 0 0 14px rgba(255, 80, 80, 0.35);
          }
          100% {
            box-shadow: 0 0 0px rgba(255, 80, 80, 0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
