import useBakeryQuery from "../../../hooks/use-bakery-query";
import PanelItemString from "../components/panel-item-string";

export default function HyperInboundStatus() {
  const network = useBakeryQuery("network-status");

  if (network() === undefined) return null;
  else if (!network()!.hyper.inbound.available) {
    return (
      <div class="alert alert-info">
        Inbound connections from HyperDHT are not available
      </div>
    );
  } else if (!network()!.hyper.inbound.running) {
    if (network()!.hyper.inbound.error)
      return (
        <div class="alert alert-error">
          HyperDHT node failed to start: {network()!.hyper.inbound.error}
        </div>
      );
    else
      return <div class="alert alert-loading">Starting HyperDHT node...</div>;
  } else
    return (
      <PanelItemString
        label="Hyper Address"
        value={network()!.hyper.inbound.address}
        isLoading={!network()!.hyper.inbound.address}
        qr
      />
    );
}
