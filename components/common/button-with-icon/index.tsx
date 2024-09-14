import ArrowRightIcon from '@/components/icons/arrow-right'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ButtonWithIcon = ({
  variant,
  children,
  size,
  className,
  onClick,
  icon,
  iconPosition = 'right',
}: ButtonProps) => (
  <Button
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
