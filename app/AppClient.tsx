"use client";

import { useState } from "react";
import SenderView from "./components/SenderView";
import ReceiverView from "./components/ReceiverView";

type Invitation = {
  id: number;
  name: string;
  status: "invited" | "accepted" | "rejected";
};

export default function AppClient() {
  const [inviteName, setInviteName] = useState("");
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [acceptedMessage, setAcceptedMessage] = useState("");

  const invite =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("invite")
      : null;

  function sendInvite() {
    if (!inviteName.trim()) return;

    setInvitations((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: inviteName,
        status: "invited",
      },
    ]);

    setInviteName("");
  }

  function acceptInvite(id: number) {
    setInvitations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "accepted" } : i
      )
    );

    setAcceptedMessage(
      "You now have privileged access. You will be included when moments occur."
    );
  }

  function rejectInvite(id: number) {
    setInvitations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "rejected" } : i
      )
    );
  }

  function sendNotification() {
    alert("Moment sent");
  }

  // RECEIVER MODE
  if (invite === "receiver") {
    return (
      <ReceiverView
        invitations={invitations}
        acceptInvite={acceptInvite}
        rejectInvite={rejectInvite}
        acceptedMessage={acceptedMessage}
      />
    );
  }

  // SENDER MODE (default)
  return (
    <SenderView
      sendNotification={sendNotification}
      sendInvite={sendInvite}
      inviteName={inviteName}
      setInviteName={setInviteName}
      invitations={invitations}
    />
  );
}
