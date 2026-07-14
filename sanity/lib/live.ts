// Querying with "sanityFetch" keeps content automatically updated.
// Import and render <SanityLive /> in the root layout to enable live updates.

import { defineLive } from "next-sanity/live";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
});