import { z } from "zod";

type InputOutput<In, Out> = [In, Out];

export type BakeryQueries = {
  config: InputOutput<void, BakeryConfigType>;
  services: InputOutput<void, string[]>;
  connections: InputOutput<void, Record<string, ConnectionStatus>>;
  "network-status": InputOutput<void, NetworkStatusResult>;
};
export type BakeryActions = {
  "config-merge": InputOutput<Partial<BakeryConfigType>, void>;
};

// connections
export type ConnectionStatus =
  | "initialized"
  | "connecting"
  | "connected"
  | "waiting-for-retrying"
  | "retrying"
  | "dormant"
  | "error"
  | "rejected"
  | "terminated";

// network-status
export type NetworkOutboundState = {
  available: boolean;
  running?: boolean;
  error?: string;
};
export type NetworkInboundState = {
  available: boolean;
  running?: boolean;
  error?: string;
  address?: string;
};
export type NetworkState = {
  inbound: NetworkInboundState;
  outbound: NetworkInboundState;
};
export type NetworkStatusResult = {
  tor: NetworkState;
  hyper: NetworkState;
  i2p: NetworkState;
};

export const bakeryConfigSchema = z.object({
  name: z.string().default("").describe("The name of the bakery node"),
  description: z
    .string()
    .default("")
    .describe("A short description of the bakery node"),

  owner: z.string().optional(),
  public_address: z.string().url().optional(),

  // legacy config (unused)
  requireReadAuth: z.boolean().default(false),
  publicAddresses: z.array(z.string().url()).default([]),
  autoListen: z.boolean().default(false),
  logsEnabled: z.boolean().default(false),

  // receiver config
  receiverEnabled: z.boolean().default(true),

  // nostr network config
  bootstrap_relays: z.array(z.string().url()).optional(),
  lookup_relays: z.array(z.string().url()).optional(),

  // hyper config
  hyperEnabled: z.boolean().default(false),

  // tor config
  enableTorConnections: z.boolean().default(true),
  enableI2PConnections: z.boolean().default(true),
  enableHyperConnections: z.boolean().default(false),
  routeAllTrafficThroughTor: z.boolean().default(false),

  // gossip config
  gossipEnabled: z.boolean().default(false),
  gossipInterval: z.number().default(10 * 60_000),
  gossipBroadcastRelays: z.array(z.string().url()).default([]),
});

export type BakeryConfigType = z.infer<typeof bakeryConfigSchema>;
