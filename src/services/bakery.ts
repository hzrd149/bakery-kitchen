import { map, switchMap } from "rxjs/operators";
import defined from "../operators/defined";
import bakery$ from "./connection";
import createQuery from "../classes/bakery/query";

const bakery = bakery$.pipe(defined());

export const bakeryConfig = bakery.pipe(
  map((bakery) => createQuery(bakery, "config")),
);

export const services = bakery.pipe(
  switchMap((b) => createQuery(b, "services")),
);
