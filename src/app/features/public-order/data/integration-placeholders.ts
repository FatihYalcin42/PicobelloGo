import { IntegrationPlaceholder } from '../models/integration-placeholder.model';

/**
 * Visible placeholders for backend-dependent integrations that are not connected yet.
 */
export const INTEGRATION_PLACEHOLDERS: IntegrationPlaceholder[] = [
  {
    id: 'order-api',
    title: 'Order persistence API',
    description:
      'Validated frontend payloads are ready, but no backend endpoint is connected yet.',
    statusLabel: 'Placeholder active'
  },
  {
    id: 'notifications',
    title: 'Operator notifications',
    description:
      'Email, automation, or messaging alerts will be connected after the backend order flow exists.',
    statusLabel: 'Placeholder active'
  },
  {
    id: 'admin-review',
    title: 'Admin processing',
    description:
      'The admin domain is reserved in the project structure, but no internal workflow is exposed yet.',
    statusLabel: 'Placeholder active'
  }
];
