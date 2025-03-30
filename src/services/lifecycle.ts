import { combineLatest, switchMap } from "rxjs";
import { accounts } from "./accounts";
import bakery$ from "./connection";
import { kinds } from "nostr-tools";
import defined from "../operators/defined";

// Subscribe to the users profile when connected
combineLatest([accounts.active$.pipe(defined()), bakery$.pipe(defined())]).pipe(
  switchMap(([account, bakery]) =>
    bakery.req([
      {
        kinds: [kinds.Metadata, kinds.Contacts, kinds.RelayList],
        authors: [account.pubkey],
      },
    ]),
  ),
);
