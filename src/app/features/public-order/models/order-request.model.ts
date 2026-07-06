/**
 * Single selected service line that will later be submitted to the backend API.
 */
export interface OrderRequestItem {
  serviceItemId: string;
  quantity: number;
}

/**
 * Payload contract for the future public order API.
 */
export interface OrderRequest {
  items: OrderRequestItem[];
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
  };
  pickupDate: string;
  notes: string;
  privacyAccepted: boolean;
}
