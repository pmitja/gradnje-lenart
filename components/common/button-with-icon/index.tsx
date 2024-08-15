import ArrowRightIcon from '@/components/icons/arrow-right'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ButtonWithIcon = ({ variant, children, size, className, onClick }: ButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn('flex h-fit gap-[6px]', className)}
    >
      {children}
      <ArrowRightIcon />
    </Button>
  )
}

export default ButtonWithIcon
