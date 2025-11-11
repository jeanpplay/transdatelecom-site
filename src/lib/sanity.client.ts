import {createClient} from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,   // p.ej. "sthcs42v"
  dataset: process.env.SANITY_DATASET!,        // "production"
  apiVersion: process.env.SANITY_API_VERSION || "2025-11-11",
  useCdn: true,                                // público/rápido
});
