import { prepareWithSegments, type PreparedTextWithSegments } from '@chenglou/pretext'

const cache = new Map<string, PreparedTextWithSegments>()
const MAX_PREPARED_ENTRIES = 64

function touchPrepared(key: string, prepared: PreparedTextWithSegments): PreparedTextWithSegments {
  cache.delete(key)
  cache.set(key, prepared)
  return prepared
}

export function getPrepared(text: string, font: string): PreparedTextWithSegments {
  const key = `${font}::${text}`
  const cached = cache.get(key)
  if (cached !== undefined) return touchPrepared(key, cached)

  const prepared = prepareWithSegments(text, font)
  touchPrepared(key, prepared)

  while (cache.size > MAX_PREPARED_ENTRIES) {
    const oldestKey = cache.keys().next().value as string | undefined
    if (oldestKey === undefined) break
    cache.delete(oldestKey)
  }

  return prepared
}

export function clearAll(): void {
  cache.clear()
}
