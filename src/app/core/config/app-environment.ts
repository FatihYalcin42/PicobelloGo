/**
 * Frontend-safe runtime configuration placeholder.
 *
 * Keep secrets out of this file. It exists only to document the future
 * integration points until the real backend and deployment pipeline are in place.
 */
export const appEnvironment = {
  apiBaseUrl: null as string | null,
  features: {
    persistOrders: false,
    operatorNotifications: false,
    adminPortal: false
  }
} as const;
