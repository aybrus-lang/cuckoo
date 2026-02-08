"use client";

import { useState } from "react";

type Notification = {
  id: number;
  creator: string;
  message: string;
  time: string;
  emoji: string;
  closing?: boolean;
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

function formatRemaining(ms: number) {
  if (ms <= 0) return "expired";
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function getExpiryClass(expiresAt: number, now: number) {
  const remaining = expiresAt - now;
  if (remaining <= 0) return "expired";
  if (remaining < 5 * 60 * 1000) return "expiring";
  return "";
}

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
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function toggleCreator(creator: string) {
    setCollapsed((prev) => ({
      ...prev,
      [creator]: !prev[creator],
    }));
  }

  return (
    <section style={{ marginBottom: 32 }}>
      {acceptedMessage && (
        <div style={{ color: "green", marginBottom: 12 }}>
          {acceptedMessage}
        </div>
      )}

      {hasAccess &&
        Object.entries(notificationsByCreator).map(([creator, notes]) => {
          const expiredCount = notes.filter((n) => n.expiresAt <= now).length;

          return (
            <div key={creator} style={{ marginBottom: 16 }}>
              {/* Creator header */}
              <div
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => toggleCreator(creator)}
              >
                {creator} {collapsed[creator] ? "▸" : "▾"}
              </div>

              {/* Expired summary */}
              {expiredCount > 0 && (
                <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>
                  {expiredCount} expired
                </div>
              )}

              {/* Notifications */}
              <div
                className={`creator-group ${
                  collapsed[creator] ? "collapsed" : "expanded"
                }`}
              >
                {notes.map((note) => {
                  const remaining = note.expiresAt - now;
                  return (
                    <div
                      key={note.id}
                      className={`notification ${
                        note.closing ? "closing" : ""
                      } ${getExpiryClass(note.expiresAt, now)}`}
                    >
                      {note.emoji} {note.message}
                      <span style={{ marginLeft: 8, opacity: 0.6 }}>
                        ({formatRemaining(remaining)})
                      </span>
                      <button onClick={() => dismissNotification(note.id)}>
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

      {/* Invitations */}
      <h2>Invitations</h2>
      {invitations.map((invite) => (
        <div key={invite.id} style={{ marginBottom: 6 }}>
          <span>{invite.name}</span>
          {invite.status === "invited" ? (
            <>
              <button onClick={() => acceptInvite(invite.id)}>Accept</button>
              <button onClick={() => rejectInvite(invite.id)}>Reject</button>
            </>
          ) : (
            <span> — {invite.status}</span>
          )}
        </div>
      ))}
    </section>
  );
}
