import type { Product } from '../types/Product';
import type { ProductDetails } from '../types/ProductDetails';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../constants';

export async function fetchProducts<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;

      try {
        const errorData = await response.json();

        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use the default error message
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
}

export function getAllProducts(): Promise<Product[]> {
  return fetchProducts<Product[]>(API_ENDPOINTS.PRODUCTS);
}

export function getSpecificProducts(
  productsType: string,
): Promise<ProductDetails[]> {
  return fetchProducts<ProductDetails[]>(`./api/${productsType}.json`);
}
