export type Notification = {
  id: string;
  creator: string;
  message: string;
  expiresAt: number;
  inviteId: string;   // REQUIRED for private notifications
};

export type Invitation = {
  id: string;
  name: string;
  status: "invited" | "accepted" | "rejected";
  token: string;      // REQUIRED for private links
};
