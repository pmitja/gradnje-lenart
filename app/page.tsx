import ButtonWithIcon from '@/components/common/button-with-icon';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-10 md:gap-16 lg:gap-28">
      
        <Button variant="primary">Hello</Button>
        <Button variant="secondary">Hello</Button>
        <ButtonWithIcon variant='primary' size={'large-bold'}>Hello</ButtonWithIcon>
    </div>
  );
}
