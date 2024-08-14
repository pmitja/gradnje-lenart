import ProjectFilterHero from '@/components/common/hero/project-filter-hero';
import ProccesOfBuying from '@/components/common/procces-of-buying';
import Faq from '@/components/layouts/sections/faq';
import ProjectsSection from '@/components/layouts/sections/projects-section';

const ActualProjectPage = () => {
  return (
    <>
      <ProjectFilterHero />
      <ProjectsSection />
      <ProccesOfBuying />
      <Faq />
    </>
  );
};

export default ActualProjectPage;
