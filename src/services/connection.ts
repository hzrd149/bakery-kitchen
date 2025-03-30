import { map, filter, repeat, switchMap, shareReplay } from "rxjs/operators";
import { bakeryUrl } from "./settings";
import { Relay } from "../classes/relay";

const bakery$ = bakeryUrl.pipe(
  map((url) => (url ? new Relay(url) : null)),
  shareReplay(),
);

// always stay connected to the bakery
bakery$
  .pipe(
    filter((bakery) => bakery !== null),
    switchMap((bakery) => bakery.req([{ kinds: [2] }], "ping")),
    repeat(),
  )
  .subscribe();

if (import.meta.env.DEV) {
  // @ts-expect-error
  bakery$.subscribe((bakery) => (window.bakery = bakery));
}

export default bakery$;
