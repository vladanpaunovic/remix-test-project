import { prisma } from "~/db.server";

import * as Sentry from "@sentry/remix";
import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

Sentry.init({
  dsn: "https://fb4ff75f73454b1bae0feabfa1730518@o824384.ingest.sentry.io/6547455",
  tracesSampleRate: 1,
  integrations: [new Sentry.Integrations.Prisma({ client: prisma })],
  // ...
});

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
