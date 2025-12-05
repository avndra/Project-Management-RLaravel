import { LucideIcon } from 'lucide-react';
import { Progress } from './ui/progress';
import { cn } from '../lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  progress: number;
  change: string;
  color: 'blue' | 'green' | 'orange';
}

export function StatsCard({ title, value, icon: Icon, progress, change, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  const progressColors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-gray-900">{value}</h3>
        </div>
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <Progress value={progress} className="mb-3 h-2" indicatorClassName={progressColors[color]} />

      <p className="text-xs text-gray-500">{change}</p>
    </div>
  );
}
