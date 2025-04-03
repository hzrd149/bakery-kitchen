import { JSX } from "solid-js";

import I2POutboundStatus from "./i2p-outbound";
import I2PInboundStatus from "./i2p-inbound";
import useBakeryQuery from "../../../hooks/use-bakery-query";

export default function I2PNetworkStatus() {
  const config = useBakeryQuery("config");
  const network = useBakeryQuery("network-status");

  let content: JSX.Element = null;

  if (network() === undefined || config() === undefined)
    content = <div class="loading-spinner" />;
  else {
    content = (
      <>
        <I2POutboundStatus />
        <I2PInboundStatus />
      </>
    );
  }

  return (
    <>
      <div class="flex items-center gap-2">
        <h2 class="text-xl font-bold">I2P</h2>
        <a
          href="https://geti2p.net/en/"
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
