import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ButtonWithIcon = ({
  variant,
  type,
  children,
  size,
  className,
  onClick,
  icon,
  iconPosition = 'right',
}: ButtonProps) => (
  <Button
    type={type}
    variant={variant}
    size={size}
    onClick={onClick}
    className={cn('flex h-fit gap-[6px]', className)}
  >
    {iconPosition === 'left' && icon}
    {children}
    {iconPosition === 'right' && icon}
  </Button>
)

export default ButtonWithIcon
