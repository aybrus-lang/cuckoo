export type Notification = {
  id: string;
  creator: string;
  message: string;
  time: string;
  expiresAt: number;
};

export type Invitation = {
  id: string;
  name: string;
  status: "invited" | "accepted" | "rejected";
};
