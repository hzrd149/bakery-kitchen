import { MultiplexWebSocket } from "applesauce-relay";

import { BakeryConfigType } from "../types";
import createAction from "../action";

export function updateBakeryConfig(
  socket: MultiplexWebSocket,
  config: Partial<BakeryConfigType>,
) {
  return createAction(socket, "config-merge", config);
}
