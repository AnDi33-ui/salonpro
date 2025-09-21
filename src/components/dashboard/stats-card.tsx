import { LucideIcon } from "lucide-react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
}

export default function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-8 w-8 text-purple-600" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {value}
              </div>
              {trend && (
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trendUp ? (
                    <TrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                  )}
                  <span>{trend}</span>
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  )
}