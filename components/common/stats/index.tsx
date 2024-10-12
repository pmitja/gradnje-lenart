import Stat, { StatType } from '../stat'

interface StatsProps {
  stats: StatType[]
}

const Stats = ({ stats }: StatsProps) => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {stats.map((stat, index) => (
      <Stat
        subtitle={stat.subtitle}
        key={index}
        endValue={stat.endValue}
        isPercentage={stat.isPercentage}
      />
    ))}
  </div>
)

export default Stats
