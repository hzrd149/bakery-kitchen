import { map, filter, repeat, switchMap, shareReplay } from "rxjs/operators";
import { Relay } from "applesauce-relay";

import { bakeryUrl } from "./settings";

const bakery$ = bakeryUrl.pipe(
  map((url) => (url ? new Relay(url) : null)),
  shareReplay(),
);

// always stay connected to the bakery
bakery$
  .pipe(
    filter((bakery) => bakery !== null),
    switchMap((bakery) => bakery.message$),
    repeat(),
  )
  .subscribe();

if (import.meta.env.DEV) {
  // @ts-expect-error
  bakery$.subscribe((bakery) => (window.bakery = bakery));
}

export default bakery$;
