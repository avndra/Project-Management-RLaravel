import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { date: 'Mon', completed: 10, inProgress: 8, notStarted: 5 },
  { date: 'Tue', completed: 15, inProgress: 12, notStarted: 7 },
  { date: 'Wed', completed: 22, inProgress: 10, notStarted: 6 },
  { date: 'Thu', completed: 28, inProgress: 14, notStarted: 8 },
  { date: 'Fri', completed: 35, inProgress: 11, notStarted: 5 },
  { date: 'Sat', completed: 42, inProgress: 9, notStarted: 4 },
  { date: 'Sun', completed: 48, inProgress: 8, notStarted: 3 },
];

export function TaskProgressChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 mb-1">Task Progress</h2>
          <p className="text-sm text-gray-500">Weekly overview of task completion</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span className="text-gray-600">Not Started</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#14b8a6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCompleted)"
          />
          <Area
            type="monotone"
            dataKey="inProgress"
            stroke="#f97316"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorInProgress)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
