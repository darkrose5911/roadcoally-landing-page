"use client";

import { useEffect, useRef } from 'react';

export default function ErrorReporter({ error, reset }) {
  const reportedRef = useRef(false);
  const pollIntervalRef = useRef();

  // Instrumentation effect - runs on all error boundaries
  useEffect(() => {
    if (reportedRef.current) return;

    const reportError = async () => {
      try {
        reportedRef.current = true;
        
        // Detect if we're in an iframe (embedded mode)
        const isEmbedded = window !== window.top;
        
        const errorData = {
          message: error?.message || 'Unknown error occurred',
          stack: error?.stack || 'No stack trace available',
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          embedded: isEmbedded,
          type: 'client_error'
        };

        // Send error to monitoring service
        await fetch('/api/errors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorData)
        }).catch(() => {
          // Fallback: log to console if API fails
          console.error('Error reporting failed:', errorData);
        });

      } catch (reportingError) {
        console.error('Error in error reporting:', reportingError);
      }
    };

    reportError();

    // Global error handlers
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Unhandled Promise Rejection: ${event.reason}`,
          stack: event.reason?.stack || 'No stack trace',
          timestamp: new Date().toISOString(),
          url: window.location.href,
          type: 'unhandled_rejection'
        })
      }).catch(() => {});
    };

    const handleError = (event) => {
      console.error('Global error:', event.error);
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: event.error?.message || event.message || 'Global error',
          stack: event.error?.stack || 'No stack trace',
          timestamp: new Date().toISOString(),
          url: window.location.href,
          type: 'global_error'
        })
      }).catch(() => {});
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    // Poll for Next.js error overlay and hide it
    const pollForOverlay = () => {
      const overlay = document.querySelector('nextjs-portal');
      if (overlay) {
        overlay.style.display = 'none';
      }
    };

    pollIntervalRef.current = setInterval(pollForOverlay, 100);
    pollForOverlay(); // Run immediately

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [error]);

  // Global error route effect - only runs when used as global-error.js
  useEffect(() => {
    // Detect if this is being used as a global error boundary
    const isGlobalError = window.location.pathname === '/_error' || 
                         document.title.includes('Application Error') ||
                         window.location.search.includes('error=global');

    if (isGlobalError) {
      // Send message to parent if in iframe
      if (window !== window.top) {
        window.parent.postMessage({
          type: 'GLOBAL_ERROR',
          error: {
            message: error?.message || 'Global application error',
            stack: error?.stack
          }
        }, '*');
      }
    }
  }, [error]);

  // Only render UI for global errors (when reset function is available)
  if (typeof reset === 'function') {
    return (
      <html>
        <body className="bg-destructive text-destructive-foreground min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card text-card-foreground rounded-lg p-6 shadow-lg">
            <div className="space-y-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-destructive mb-2">
                  Application Error
                </h1>
                <p className="text-muted-foreground">
                  Something went wrong with the application.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={reset}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Try Again
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Go Home
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && error && (
                <details className="mt-4 p-3 bg-muted rounded text-sm">
                  <summary className="cursor-pointer font-medium mb-2">
                    Error Details (Development)
                  </summary>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong>Message:</strong>
                      <pre className="mt-1 whitespace-pre-wrap break-words">
                        {error.message}
                      </pre>
                    </div>
                    {error.stack && (
                      <div>
                        <strong>Stack:</strong>
                        <pre className="mt-1 whitespace-pre-wrap break-words text-xs overflow-x-auto">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        </body>
      </html>
    );
  }

  // For non-global errors, return null (invisible error reporter)
  return null;
}