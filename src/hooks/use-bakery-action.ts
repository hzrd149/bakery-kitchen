import { createSignal } from "solid-js";
import runAction from "../classes/bakery/action";
import useBakery from "./use-bakery";
import { BakeryActions } from "../classes/bakery";

export default function useBakeryAction<T extends keyof BakeryActions>(
  name: T,
) {
  const [running, setRunning] = createSignal(false);
  const bakery = useBakery();

  const run = async (args: BakeryActions[T][0]) => {
    if (!bakery()) return;

    setRunning(true);
    try {
      const result = await runAction(bakery()!, name, args);
      setRunning(false);
      return result;
    } catch (error) {
      console.error(error);
      setRunning(false);
    }
  };

  return { running, run };
}
