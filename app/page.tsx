"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import SenderView from "./components/SenderView";
import ReceiverView from "./components/ReceiverView";
const receiverLink =
  typeof window !== "undefined"
    ? `${window.location.origin}/?invite=receiver`
    : "";

/* =======================
   Types
======================= */

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

/* =======================
   Styles
======================= */

const styles = `
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-6px); }
}

.notification { animation: slideIn 0.25s ease-out; }
.notification.closing { animation: slideOut 0.2s ease-in forwards; }
.notification:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(0,0,0,0.12); }

.notification.expiring { opacity: 0.65; transform: scale(0.98); transition: opacity 0.6s ease, transform 0.6s ease; }
.notification.expired { opacity: 0; transform: translateY(-4px) scale(0.98); transition: opacity 0.4s ease, transform 0.4s ease; }
.notification.expiring:hover { opacity: 0.85; transform: scale(1); }

.creator-group { overflow: hidden; transition: max-height 0.35s ease, opacity 0.25s ease; }
.creator-group.collapsed { max-height: 0; opacity: 0; }
.creator-group.expanded { max-height: 500px; opacity: 1; }
`;

/* =======================
   Helper functions
======================= */

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

/* =======================
   Page
======================= */

function Home() {

  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite");

  // --- hooks first
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(Date.now());
const receiverLink =
  typeof window !== "undefined"
    ? `${window.location.origin}/?invite=receiver`
    : "";

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [inviteName, setInviteName] = useState("");
  const [acceptedMessage, setAcceptedMessage] = useState<string | null>(null);

  const STACK_LIMIT = 3;

  // --- hydration safety and localStorage
  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const savedNotifs = localStorage.getItem("cuckoo_notifications");
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));

      const savedInvites = localStorage.getItem("cuckoo_invitations");
      if (savedInvites) setInvitations(JSON.parse(savedInvites));
    }
  }, []);

  // --- ticking clock
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, [mounted]);

  // --- persist invitations
  useEffect(() => {
    localStorage.setItem("cuckoo_invitations", JSON.stringify(invitations));
  }, [invitations]);

  // --- persist notifications
  useEffect(() => {
    localStorage.setItem("cuckoo_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // --- remove expired notifications automatically
  useEffect(() => {
    const interval = setInterval(() => {
      const current = Date.now();

      // mark expiring/expired
      setNotifications((prev) =>
        prev.map((n) =>
          n.expiresAt <= current ? { ...n, closing: true } : n
        )
      );

      // remove after CSS fade
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.expiresAt > Date.now())
        );
      }, 450);
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  // --- storage sync for other tabs
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === "cuckoo_notifications" && e.newValue) {
        setNotifications(JSON.parse(e.newValue));
      }
      if (e.key === "cuckoo_invitations" && e.newValue) {
        setInvitations(JSON.parse(e.newValue));
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // --- conditional return after hooks
  if (!mounted) return null;

  const ROLE: "sender" | "receiver" = inviteToken ? "receiver" : "sender";

  // --- actions
  function sendInvite() {
    if (!inviteName.trim()) return;
    const newInvite: Invitation = {
      id: Date.now(),
      name: inviteName.trim(),
      status: "invited",
    };
    setInvitations((prev) => [newInvite, ...prev]);
    setInviteName("");
  }

  function sendNotification() {
    const emojis = ["🔥", "💦", "🚨"];
    const newNotification: Notification = {
      id: Date.now(),
      creator: "Alex",
      message: "New post published",
      time: new Date().toLocaleTimeString(),
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      expiresAt: Date.now() + 1000 * 60 * 60 * 6,
    };
    setNotifications((prev) =>
      prev.length >= 20 ? prev : [newNotification, ...prev]
    );
  }

  function acceptInvite(id: number) {
    setInvitations((prev) =>
      prev.map((invite) =>
        invite.id === id ? { ...invite, status: "accepted" } : invite
      )
    );
    setAcceptedMessage("Invitation accepted. Notifications unlocked.");
    setTimeout(() => setAcceptedMessage(null), 2500);
  }

  function rejectInvite(id: number) {
    setInvitations((prev) =>
      prev.map((invite) =>
        invite.id === id ? { ...invite, status: "rejected" } : invite
      )
    );
  }

  function dismissNotification(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, closing: true } : n))
    );
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 200);
  }

  // --- derived data
  const visibleNotifications = notifications.slice(0, STACK_LIMIT);

  const notificationsByCreator = visibleNotifications.reduce(
    (groups: Record<string, Notification[]>, notification: Notification) => {
      if (!groups[notification.creator]) groups[notification.creator] = [];
      groups[notification.creator].push(notification);
      return groups;
    },
    {}
  );

  const hasAccess = invitations.some((invite) => invite.status === "accepted");

  /* =======================
     Render
  ======================= */

  return (
    <>
      <style>{styles}</style>

      <main>
        <h1>🐦 Cuckoo!</h1>

        {ROLE === "sender" && (
          <SenderView
            sendNotification={sendNotification}
            sendInvite={sendInvite}
            inviteName={inviteName}
            setInviteName={setInviteName}
            invitations={invitations}
          />
        )}

        {ROLE === "receiver" && (
          <ReceiverView
            invitations={invitations}
            acceptInvite={acceptInvite}
            rejectInvite={rejectInvite}
            hasAccess={hasAccess}
            notificationsByCreator={notificationsByCreator}
            dismissNotification={dismissNotification}
            acceptedMessage={acceptedMessage}
            now={now}
          />
        )}
      </main>
    </>
  );
}
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  );
}
