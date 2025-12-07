/**
 * Validates User ID format (must be exactly 8 digits)
 * @param id - User ID string to validate
 * @returns true if valid, false otherwise
 */
export function validateUserId(id: string): boolean {
  return /^\d{8}$/.test(id);
}

