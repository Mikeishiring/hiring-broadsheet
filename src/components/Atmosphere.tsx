interface AtmosphereLayer {
  readonly gradient: string
  readonly opacity: number
}

interface AtmosphereProps {
  readonly layers: readonly AtmosphereLayer[]
}

// Decorative radial gradient layers — non-interactive, purely visual depth.
// Same pattern as pretext's dynamic-layout demo atmosphere.
export function Atmosphere({ layers }: AtmosphereProps) {
  return (
    <>
      {layers.map((layer, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            background: layer.gradient,
            opacity: layer.opacity,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  )
}
