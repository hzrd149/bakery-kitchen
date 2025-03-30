import { Observable } from "rxjs";
import hash_sum from "hash-sum";
import { shareReplay, tap, map } from "rxjs/operators";
import { MultiplexWebSocket } from "applesauce-relay";

import { BakeryQueries } from "./types";

const cache = new WeakMap<MultiplexWebSocket, Map<string, Observable<any>>>();

/** Run a QRY against a websocket */
export default function createQuery<T extends keyof BakeryQueries>(
  socket: MultiplexWebSocket,
  type: T,
  args?: BakeryQueries[T][0],
): Observable<BakeryQueries[T][1]> {
  let queries = cache.get(socket);
  if (!queries) {
    queries = new Map();
    cache.set(socket, queries);
  }

  const cacheKey = hash_sum([type, args]);
  let query = queries.get(cacheKey);

  // Create if it does not exist
  if (!query) {
    query = socket
      .multiplex(
        () => ["QRY", "OPEN", type, cacheKey, args],
        () => ["QRY", "CLOSE", cacheKey],
        (m) =>
          m[0] === "QRY" &&
          (m[1] === "DATA" || m[1] === "ERR") &&
          m[2] === cacheKey,
      )
      .pipe(
        map((message) => {
          // throw error
          if (message[1] === "ERR") throw new Error(message[2]);
          // return data
          else return message[3];
        }),
        // cleanup when query is complete
        tap({
          complete: () => {
            // cleanup query
            queries.delete(cacheKey);
          },
        }),
        // share the observable
        shareReplay(1),
      );

    queries.set(cacheKey, query);
  }

  return query;
}
