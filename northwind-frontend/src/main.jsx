import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Router.jsx'
import { ClerkProvider } from '@clerk/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import * as Sentry from "@sentry/react";
import { RouterProvider } from 'react-router'
import { SentryErrorFallback } from './components/SentryErrorFallback.jsx'
import { SentryUserSync } from './components/SentryUserSync.jsx'

const queryClient = new QueryClient()

const apiBase = import.meta.env.VITE_API_URL ?? "";
const tracePropagationTargets =
  apiBase.length > 0 ? [apiBase] : typeof window !== "undefined" ? [window.location.origin] : [];

/**
 * In simple terms, 'browserTracingIntegration' lets Sentry see things like:
 * page load timing
 * route/navigation timing
 * slow frontend interactions
 * outgoing fetch / API requests
 * frontend to backend trace linking
 */

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayCanvasIntegration({
      maskAllText: false,
      maskAllInputs: false,
      blockAllMedia: false,
    })
  ],
  // in development it is 1.0 to test that Sentry is working, but in production it should be lower like 0.1 or 0.2
  tracesSampleRate: 1.0,
  tracePropagationTargets: tracePropagationTargets,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider>
      <SentryUserSync />
      <QueryClientProvider client={queryClient}>
        <Sentry.ErrorBoundary fallback={<SentryErrorFallback />}>
          <RouterProvider router={router} />
        </Sentry.ErrorBoundary>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
