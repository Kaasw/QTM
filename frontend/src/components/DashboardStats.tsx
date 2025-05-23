import React from 'react';
import { Users, Building2, UserCog, DollarSign } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  increase?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, increase }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border-t-4 ${color}`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            {increase && (
              <p className="text-xs text-emerald-600 mt-1">
                {increase} increase
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-600', '-100')} text-${color.replace('border-', '').replace('-600', '-600')}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DashboardStatsProps {
  employeeCount: number;
  departmentCount: number;
  managerCount: number;
  avgSalary: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  employeeCount, 
  departmentCount, 
  managerCount, 
  avgSalary 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Employees"
        value={employeeCount}
        icon={<Users size={24} />}
        color="border-indigo-600"
      />
      <StatCard
        title="Departments"
        value={departmentCount}
        icon={<Building2 size={24} />}
        color="border-emerald-600"
      />
      <StatCard
        title="Department Managers"
        value={managerCount}
        icon={<UserCog size={24} />}
        color="border-purple-600"
      />
  

    </div>
  );
};

export default DashboardStats;