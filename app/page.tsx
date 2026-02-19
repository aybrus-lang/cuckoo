"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import SenderView from "./components/SenderView";
import ReceiverView from "./components/ReceiverView";

export default function Page() {
  const searchParams = useSearchParams();
  const invite = searchParams.get("invite");

  const [mode, setMode] = useState<"home" | "sender">("home");

  // Receiver view
  if (invite === "receiver") {
    return <ReceiverView />;
  }

  // Sender view
  if (invite === "receiver") {
  return (
    <ReceiverView
      invitations={[]}
      acceptInvite={() => {}}
      rejectInvite={() => {}}
      hasAccess={false}
      notificationsByCreator={{}}
      dismissNotification={() => {}}
      acceptedMessage={null}
      now={Date.now()}
    />
  );
}


  // Homepage
  return (
    <main style={{ padding: 24, textAlign: "center" }}>
      <h1>Give access to the chosen few.</h1>

      <p>
        Cuckoo lets you invite, notify, and include selected people in
        real-time experiences — privately and on your terms.
      </p>

      <button
        onClick={() => setMode("sender")}
        style={{
          padding: "12px 20px",
          borderRadius: 8,
          border: "none",
          background: "#111",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Start Sending
      </button>
    </main>
  );
}
