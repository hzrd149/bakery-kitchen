import useBakeryQuery from "../../../hooks/use-bakery-query";
import useBakeryAction from "../../../hooks/use-bakery-action";
import { InfoIcon, ErrorIcon } from "../../../components/icons";

export default function I2POutboundStatus() {
  const status = useBakeryQuery("network-status");
  const config = useBakeryQuery("config");
  const update = useBakeryAction("config-merge");

  let content;
  if (status() === undefined) content = null;
  else if (!status()!.i2p.outbound.available) {
    content = (
      <div role="alert" class="alert">
        <InfoIcon />
        <span>Outbound connections to I2P are not available</span>
      </div>
    );
  } else if (status()!.i2p.outbound.error) {
    content = (
      <div role="alert" class="alert">
        <span class="loading loading-spinner"></span>
        <span>Testing I2P proxy...</span>
      </div>
    );
  } else if (
    !status()!.i2p.outbound.running &&
    config()?.enableI2PConnections
  ) {
    content = (
      <div role="alert" class="alert alert-error alert-soft">
        <ErrorIcon />
        <span>I2P proxy failed: {status()!.i2p.outbound.error}</span>
      </div>
    );
  }

  return (
    <>
      {status()?.i2p.outbound.available && (
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Connect to i2p relays</span>
            <input
              type="checkbox"
              class="toggle"
              checked={config()?.enableI2PConnections}
              onChange={(e) =>
                update.run({
                  enableI2PConnections: e.currentTarget.checked,
                })
              }
            />
          </label>
          <label class="label">
            <span class="label-text-alt">
              Allows the node to connect to .i2p domains
            </span>
          </label>
        </div>
      )}
      {content}
    </>
  );
}
