// Theme factory — deep merges overrides with parchment base theme

import { parchment } from './parchment.ts'
import type { BroadsheetTheme } from './types.ts'

type DeepPartial<T> = {
  readonly [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  overrides: DeepPartial<T>,
): T {
  const result = { ...base }

  for (const key of Object.keys(overrides) as Array<keyof T>) {
    const overrideValue = overrides[key]
    const baseValue = base[key]

    if (
      overrideValue !== undefined &&
      typeof overrideValue === 'object' &&
      overrideValue !== null &&
      !Array.isArray(overrideValue) &&
      typeof baseValue === 'object' &&
      baseValue !== null &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMerge(
        baseValue as Record<string, unknown>,
        overrideValue as DeepPartial<Record<string, unknown>>,
      ) as T[keyof T]
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue as T[keyof T]
    }
  }

  return result
}

export function createTheme(
  overrides: DeepPartial<BroadsheetTheme>,
): BroadsheetTheme {
  return deepMerge(
    parchment as unknown as Record<string, unknown>,
    overrides as DeepPartial<Record<string, unknown>>,
  ) as unknown as BroadsheetTheme
}
