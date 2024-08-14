import { Sparkle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ProjectsFilter from '@/components/common/filter/projects-filter';

const ProjectFilterHero = () => {
  return (
    <div className="min-w-[100vw] bg-hero-page bg-cover w-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] pt-10 md:pt-16 lg:pt-0">
      <div className="container w-full flex flex-col items-center lg:grid-cols-2 justify-center relative lg:gap-5 gap-8 lg:w-full lg:pt-20 lg:pb-28 pb-8">
        <Badge>
          <Sparkle />
          Aktualni projekti
        </Badge>
        <h2 className="text-4xl leading-[120%] md:leading-[57px] font-bold md:text-[51px] lg:leading-[100.5px] lg:text-[67px] lg:mt-2 lg:max-w-[75%] text-center">
          Odprite vrata v vaš nov čudovit dom
        </h2>
        <p className="font-archivo text-lg leading-6  lg:text-xl lg:leading-8 text-secondary-200 lg:max-w-[60%] text-center">
          Naše strokovno znanje nam omogoča, da vam ponudimo domove, ki ne le
          ustrezajo vašemu življenjskemu slogu, ampak tudi uresničujejo vaše
          ambicije.
        </p>
        <ProjectsFilter />
      </div>
    </div>
  );
};

export default ProjectFilterHero;
