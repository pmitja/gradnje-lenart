interface StatProps {
  title: string
  subtitle: string
}

export interface StatType {
  title: string
  subtitle: string
}

const Stat = ({ title, subtitle }: StatProps) => (
  <div className="flex-1 rounded-sm bg-body-200 p-5 text-secondary-300 shadow-md">
    <p className="md:text-3xl text-2xl font-bold">{title}</p>
    <p className="lg:text-xl text-lg">{subtitle}</p>
  </div>
)

export default Stat
