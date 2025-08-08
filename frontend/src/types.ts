export type ScheduledMessage = {
  _id: string;
  teamId: string;
  channel: string;
  message: string;
  time: string;
  sent: boolean;
};