import Stat, { StatType } from '../stat'

interface StatsProps {
  stats: StatType[]
}

const Stats = ({ stats }: StatsProps) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Stat title={stat.title} subtitle={stat.subtitle} key={index} />
      ))}
    </div>
)

export default Stats
