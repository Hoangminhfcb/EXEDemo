/**
 * GUID utility functions
 */

/**
 * Generate a valid GUID v4
 */
export const generateGuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Validate if a string is a valid GUID
 */
export const isValidGuid = (guid: string): boolean => {
  const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return guidRegex.test(guid)
}

/**
 * Convert string to GUID format (if it's not already)
 */
export const ensureGuidFormat = (value: string): string => {
  if (isValidGuid(value)) {
    return value
  }

  // If it's a simple string like "1", "2", etc., convert to a deterministic GUID
  // This is a simple approach - you might want to map specific IDs to specific GUIDs
  const hash = value.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  // Create a deterministic GUID based on the hash
  const hex = Math.abs(hash).toString(16).padStart(8, "0")
  return `${hex.substring(0, 8)}-${hex.substring(0, 4)}-4${hex.substring(1, 4)}-8${hex.substring(0, 3)}-${hex.substring(0, 12).padEnd(12, "0")}`
}

/**
 * Default bakery GUID for demo purposes
 */
export const DEFAULT_BAKERY_GUID = "550e8400-e29b-41d4-a716-446655440000"

/**
 * Map common bakery IDs to GUIDs
 */
export const BAKERY_ID_MAP: Record<string, string> = {
  "1": "550e8400-e29b-41d4-a716-446655440000",
  "2": "550e8400-e29b-41d4-a716-446655440001",
  "3": "550e8400-e29b-41d4-a716-446655440002",
}

/**
 * Get GUID for bakery ID
 */
export const getBakeryGuid = (bakeryId: string): string => {
  return BAKERY_ID_MAP[bakeryId] || ensureGuidFormat(bakeryId)
}
