import ArrowRightIcon from "@/components/icons/arrow-right";
import { Button, ButtonProps } from "@/components/ui/button";

const ButtonWithIcon = ({ variant, children, size }: ButtonProps) => {
  return ( <Button variant={variant} size={size} className="flex gap-[6px]">{children}<ArrowRightIcon /></Button> );
}
 
export default ButtonWithIcon;