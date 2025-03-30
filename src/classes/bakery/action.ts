import { Observable } from "rxjs";
import { nanoid } from "nanoid";
import { shareReplay, map } from "rxjs/operators";
import { MultiplexWebSocket } from "applesauce-relay";

import { BakeryActions } from "./types";

/** Run a QRY against a websocket */
export default function createAction<T extends keyof BakeryActions>(
  socket: MultiplexWebSocket,
  type: T,
  args?: BakeryActions[T][0],
): Observable<BakeryActions[T][1]> {
  const id = nanoid();

  // Create if it does not exist
  return socket
    .multiplex(
      () => ["ACT", "RUN", type, id, args],
      () => ["ACT", "CANCEL", id],
      (m) =>
        m[0] === "ACT" && (m[1] === "RESULT" || m[1] === "ERR") && m[2] === id,
    )
    .pipe(
      map((message) => {
        // throw error
        if (message[1] === "ERR") throw new Error(message[2]);
        // return data
        else return message[3];
      }),
      // share the observable
      shareReplay(1),
    );
}
