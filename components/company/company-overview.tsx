'use client'

import { useRef } from 'react'

import { StatType } from '@/components/common/stat'

import AchievementsSection from './achievements-section'
import HeroSection from './hero-section'
import TeamSection from './team-section'
import TimelineSection, { Milestone } from './timeline-section'

interface CompanyOverviewProps {
  vision: string
  strategy: string
  stats: StatType[]
  milestones: Milestone[]
  culture: string
}

const CompanyOverview = ({
  vision,
  strategy,
  stats,
  milestones,
  culture,
}: CompanyOverviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="flex flex-col">
      <HeroSection vision={vision} strategy={strategy} />
      <AchievementsSection stats={stats} />
      <TimelineSection milestones={milestones} />
      <TeamSection culture={culture} />
    </div>
  )
}

export default CompanyOverview
