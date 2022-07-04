import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import { hydrate } from "react-dom";
import * as Sentry from "@sentry/remix";
import { useEffect } from "react";

Sentry.init({
  dsn: "https://fb4ff75f73454b1bae0feabfa1730518@o824384.ingest.sentry.io/6547455",
  tracesSampleRate: 1,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.remixRouterInstrumentation(
        useEffect,
        useLocation,
        useMatches
      ),
    }),
  ],
  // ...
});

hydrate(<RemixBrowser />, document);
