import { switchMap } from "rxjs";
import { createMemo, For, from } from "solid-js";

import bakery$ from "../../../services/connection";
import defined from "../../../operators/defined";
import createQuery from "../../../classes/bakery/query";
import { CONNECTION_STATUS_MAP } from "../../../const";

function ConnectionsCard(props: { class?: string }) {
  const connections = from(
    bakery$.pipe(
      defined(),
      switchMap((bakery) => createQuery(bakery, "connections")),
    ),
  );

  const connected = createMemo(
    () =>
      connections() &&
      Object.entries(connections()!).filter(
        ([_, state]) => state === "connected",
      ).length,
  );

  return (
    <div class={`card bg-base-200 overflow-auto ${props.class}`}>
      <div class="card-body overflow-auto">
        <h2 class="card-title">Connected Relays ({connected()})</h2>
        <div class="overflow-auto">
          {connections() === undefined ? (
            <div class="flex justify-center items-center p-4">
              <span class="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <table class="table">
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <For
                  each={Object.entries(connections()!).sort((a, b) =>
                    a[1].localeCompare(b[1]),
                  )}
                >
                  {([relay, state]) => (
                    <tr>
                      <td class="truncate">{relay}</td>
                      <td>
                        <span
                          class={
                            "px-2 py-1 rounded-md " +
                            CONNECTION_STATUS_MAP[state]
                          }
                        >
                          {state}
                        </span>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectionsCard;
