"use client"

import ProjectFilterHero from './index'

const ProjectFilterHeroClientWrapper = () => {
  const scrollToResults = () => {
    const el = document.getElementById('property-listing-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return <ProjectFilterHero onFilter={scrollToResults} />
}

export default ProjectFilterHeroClientWrapper 