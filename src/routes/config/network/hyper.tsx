import { JSX } from "solid-js";

import HyperInboundStatus from "./hyper-inbound";
import HyperOutboundStatus from "./hyper-outbound";
import useBakeryQuery from "../../../hooks/use-bakery-query";
import useBakeryAction from "../../../hooks/use-bakery-action";
import { InfoIcon } from "../../../components/icons";
export default function HyperNetworkStatus() {
  const config = useBakeryQuery("config");
  const network = useBakeryQuery("network-status");

  const update = useBakeryAction("config-merge");

  let content: JSX.Element = null;

  if (network() === undefined || config() === undefined)
    content = <div class="loading-spinner" />;
  else if (!config()!.hyperEnabled) {
    content = (
      <div role="alert" class="alert whitespace-pre-wrap">
        <InfoIcon />
        <span>Enable HyperDHT in order to connect to .hyper relays</span>
        <button
          class="btn btn-ghost btn-sm"
          onClick={() =>
            update.run({
              hyperEnabled: true,
            })
          }
        >
          Enable
        </button>
      </div>
    );
  } else
    content = (
      <>
        <HyperOutboundStatus />
        <HyperInboundStatus />
      </>
    );

  return (
    <>
      <div class="flex items-center gap-2">
        <h2 class="text-xl font-bold">HyperDHT</h2>
        {config() !== undefined && (
          <div class="form-control">
            <label class="label cursor-pointer gap-2">
              <span class="label-text">Enabled</span>
              <input
                type="checkbox"
                class="toggle"
                checked={config()!.hyperEnabled}
                onChange={(e) =>
                  update.run({
                    hyperEnabled: e.currentTarget.checked,
                  })
                }
              />
            </label>
          </div>
        )}
        <a
          href="https://docs.pears.com/building-blocks/hyperdht"
          class="ml-auto text-gray-500 hover:text-gray-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          More Info
        </a>
      </div>

      {content}
    </>
  );
}
