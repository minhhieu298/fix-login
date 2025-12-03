// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tunnel:
    typeof window !== "undefined"
      ? `${window.location.origin}/api/sentry/tunnel`
      : undefined,

  // Release configuration for health monitoring
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || "development",
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || "development",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable profiling
  profilesSampleRate: 1,
  // Set sampling rate for profiling - this is evaluated only once per SDK.init call
  profileSessionSampleRate: 1.0,
  // Trace lifecycle automatically enables profiling during active traces
  profileLifecycle: "trace",
  // Add profiling integration
  integrations: [
    nodeProfilingIntegration(),
    Sentry.captureConsoleIntegration(),
    Sentry.captureRequestError,
    Sentry.captureUnderscoreErrorException,
  ],

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
