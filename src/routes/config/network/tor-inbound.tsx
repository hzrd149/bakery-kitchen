import { from } from "solid-js";
import { switchMap } from "rxjs";

import bakery$ from "../../../services/connection";
import createQuery from "../../../classes/bakery/query";
import defined from "../../../operators/defined";
import PanelItemString from "../components/panel-item-string";
import { InfoIcon, ErrorIcon } from "../../../components/icons";

export default function TorInboundStatus() {
  const status = from(
    bakery$.pipe(
      defined(),
      switchMap((bakery) => createQuery(bakery, "network-status")),
    ),
  );

  if (status() === undefined) return <div class="loading loading-spinner" />;
  else if (!status()!.tor.inbound.available) {
    return (
      <div role="alert" class="alert">
        <InfoIcon />
        <span>Inbound connections from Tor are not available</span>
      </div>
    );
  } else if (!status()!.tor.inbound.running) {
    if (status()!.tor.inbound.error)
      return (
        <div role="alert" class="alert alert-error alert-soft">
          <ErrorIcon />
          Tor hidden service failed: {status()!.tor.inbound.error}
        </div>
      );
    else
      return (
        <div role="alert" class="alert">
          <InfoIcon />
          Start tor hidden service...
        </div>
      );
  } else
    return (
      <PanelItemString
        label="Onion Address"
        value={status()!.tor.inbound.address}
        isLoading={!status()!.tor.inbound.address}
        qr
      />
    );
}
