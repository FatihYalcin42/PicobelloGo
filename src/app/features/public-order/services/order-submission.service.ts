import { Injectable } from '@angular/core';
import { appEnvironment } from '../../../core/config/app-environment';
import { OrderRequest } from '../models/order-request.model';

/**
 * Placeholder submission service that isolates the future API integration point.
 */
@Injectable({
  providedIn: 'root'
})
export class OrderSubmissionService {
  /**
   * Submits an order through the active transport. For now this stays frontend-only
   * and intentionally avoids talking to any real backend endpoint.
   *
   * @param _payload Validated order request payload.
   * @returns Submission result describing whether a real API is connected.
   */
  public async submitOrder(
    _payload: OrderRequest
  ): Promise<{ persisted: boolean; message: string }> {
    if (appEnvironment.features.persistOrders && appEnvironment.apiBaseUrl) {
      return {
        persisted: false,
        message: 'API integration placeholder is configured but not implemented yet.'
      };
    }

    return {
      persisted: false,
      message:
        'No API is connected yet. The request stays local and can be pushed to Git safely without exposing backend endpoints or secrets.'
    };
  }
}
