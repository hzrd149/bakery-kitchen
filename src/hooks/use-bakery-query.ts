import { Accessor, from } from "solid-js";
import { switchMap } from "rxjs";

import bakery$ from "../services/connection";
import defined from "../operators/defined";
import { BakeryQueries } from "../classes/bakery";
import createQuery from "../classes/bakery/query";

export default function useBakeryQuery<T extends keyof BakeryQueries>(
  name: T,
  args?: BakeryQueries[T][0],
): Accessor<BakeryQueries[T][1] | undefined> {
  return from(
    bakery$.pipe(
      defined(),
      switchMap((bakery) => createQuery(bakery, name, args)),
    ),
  );
}
