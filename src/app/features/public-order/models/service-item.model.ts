/**
 * Represents a cleaning service article that can be ordered by a customer.
 */
export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  unitLabel: string;
  price: number;
}
