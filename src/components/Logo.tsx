export function Logomark(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" fill="none" {...props}>
      <text x="3" y="26" fontSize="20" fontWeight="bold" fontFamily="monospace">
        <tspan fill="currentColor">&lt;</tspan>
        <tspan fill="#56437c">/</tspan>
        <tspan fill="currentColor">&gt;</tspan>
      </text>
    </svg>
  )
}

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 280 36" fill="none" {...props}>
      <text x="3" y="26" fontSize="20" fontWeight="bold" fontFamily="monospace">
        <tspan fill="currentColor">&lt;</tspan>
        <tspan fill="#56437c">/</tspan>
        <tspan fill="currentColor">&gt;</tspan>
      </text>
      <text
        x="50"
        y="24"
        fontSize="18"
        fontWeight="600"
        fontFamily="var(--font-lexend), system-ui, sans-serif"
        fill="currentColor"
      >
        Stardew Valley Data
      </text>
    </svg>
  )
}
