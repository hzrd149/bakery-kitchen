import { ConnectionStatus } from "./classes/bakery/types";

export const CONNECTION_STATUS_MAP: Record<ConnectionStatus, string> = {
  initialized: "bg-gray-100 text-gray-700",
  connecting: "bg-blue-100 text-blue-700",
  connected: "bg-green-100 text-green-700",
  "waiting-for-retrying": "bg-yellow-100 text-yellow-700",
  retrying: "bg-orange-100 text-orange-700",
  dormant: "bg-gray-100 text-gray-700",
  error: "bg-red-100 text-red-700",
  rejected: "bg-red-100 text-red-700",
  terminated: "bg-gray-100 text-gray-700",
};
