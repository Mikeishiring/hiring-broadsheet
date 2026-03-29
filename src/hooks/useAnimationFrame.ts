import { useEffect, useEffectEvent } from 'react'

// Runs a rAF loop, calling the callback each frame with delta time in ms.
// Starts/stops based on the `active` flag.
export function useAnimationFrame(
  callback: (dt: number) => void,
  active: boolean,
): void {
  const onFrame = useEffectEvent(callback)

  useEffect(() => {
    if (!active) return

    let rafId = 0
    let lastTime = performance.now()

    const tick = (now: number) => {
      const dt = now - lastTime
      lastTime = now
      onFrame(dt)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [active])
}
