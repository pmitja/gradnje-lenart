import InnerHero from '@/components/common/hero/inner-hero';
import ProccesOfBuying from '@/components/common/procces-of-buying';
import Faq from '@/components/layouts/sections/faq';
import ProjectsSection from '@/components/layouts/sections/projects-section';

const ActualProjectPage = () => {
  return (
    <>
      <InnerHero />
      <ProjectsSection />
      <ProccesOfBuying />
      <Faq />
    </>
  );
};

export default ActualProjectPage;
