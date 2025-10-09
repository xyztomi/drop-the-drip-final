import { useEffect, useRef } from 'react';

interface TurnstileProps {
  siteKey: string;
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
}

interface TurnstileRenderOptions {
  sitekey: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export function Turnstile({
  siteKey,
  onSuccess,
  onError,
  onExpire,
  theme = 'light',
  size = 'normal',
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const successCallbackRef = useRef(onSuccess);
  const errorCallbackRef = useRef(onError);
  const expireCallbackRef = useRef(onExpire);

  useEffect(() => {
    successCallbackRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    errorCallbackRef.current = onError;
  }, [onError]);

  useEffect(() => {
    expireCallbackRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    const loadTurnstile = () => {
      if (containerRef.current && window.turnstile) {
        // Remove existing widget if any
        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
        }

        // Render new widget
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme,
          size,
          callback: (token: string) => {
            successCallbackRef.current?.(token);
          },
          'error-callback': () => {
            errorCallbackRef.current?.();
          },
          'expired-callback': () => {
            expireCallbackRef.current?.();
          },
        });
      }
    };

    // Check if turnstile is already loaded
    if (window.turnstile) {
      loadTurnstile();
    } else {
      // Wait for script to load
      const checkTurnstile = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkTurnstile);
          loadTurnstile();
        }
      }, 100);

      return () => clearInterval(checkTurnstile);
    }

    // Cleanup on unmount
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [siteKey, theme, size]);

  return <div ref={containerRef} />;
}
