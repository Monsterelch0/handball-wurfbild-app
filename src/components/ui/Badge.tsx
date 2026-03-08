interface BadgeProps {
  children: React.ReactNode
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'gray'
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  blue:   'bg-primary-600/20 text-primary-400 border-primary-600/30',
  green:  'bg-green-500/20 text-green-400 border-green-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  red:    'bg-red-500/20 text-red-400 border-red-500/30',
  gray:   'bg-surface-700 text-surface-400 border-surface-600',
}

export default function Badge({ children, variant = 'gray' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}
