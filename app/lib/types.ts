export type Notification = {
  id: string;
  creator: string;
  message: string;
  expiresAt: number;
  inviteId: string;

  // optional = old docs still valid
  symbol?: string;
};


export type Invitation = {
  id: string;
  name: string;
  status: "invited" | "accepted" | "rejected";
  token: string;
};
