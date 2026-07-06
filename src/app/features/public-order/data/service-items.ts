import { ServiceItem } from '../models/service-item.model';

/**
 * Temporary in-memory price list used until the backend and database are available.
 */
export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'shirt',
    name: 'Business Shirt',
    description: 'Washed, pressed, and prepared for pickup.',
    unitLabel: 'per piece',
    price: 4.9
  },
  {
    id: 'trousers',
    name: 'Trousers',
    description: 'Professional textile care for everyday and formal wear.',
    unitLabel: 'per piece',
    price: 6.5
  },
  {
    id: 'dress',
    name: 'Dress',
    description: 'Gentle care for delicate fabrics and detailed cuts.',
    unitLabel: 'per piece',
    price: 12.9
  },
  {
    id: 'jacket',
    name: 'Jacket',
    description: 'Careful cleaning for outerwear and structured garments.',
    unitLabel: 'per piece',
    price: 14.5
  },
  {
    id: 'bed-linen',
    name: 'Bed Linen Set',
    description: 'Freshly cleaned and folded household textiles.',
    unitLabel: 'per set',
    price: 9.9
  }
];
