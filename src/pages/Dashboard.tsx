import { Link } from 'react-router-dom';
import { CheckCircle, Clock, TrendingUp, DollarSign, Eye, ShoppingCart, Shield, AlertTriangle, Target, Calendar } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import type { HardeningTask } from '../types';

interface TaskCardProps {
  task: HardeningTask;
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
}

export function Dashboard() {
  const { 
    tasks, 
    getCompletedTasks, 
    getPendingTasks, 
    getProgressPercentage, 
    getTotalResiliencyGain 
  } = useTask();
  
  const completedTasks = getCompletedTasks();
  const pendingTasks = getPendingTasks();
  const highPriorityPending = pendingTasks.filter(task => task.priority === 'high');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-fire-600 rounded-2xl shadow-fire mb-8">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative px-6 py-8 sm:px-8 sm:py-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  Wildfire Protection Dashboard
                </h1>
                <p className="text-primary-100 text-lg max-w-2xl">
                  Strengthen your home's defense against wildfires with our step-by-step hardening guide
                </p>
              </div>
              <div className="text-right">
                <div className="text-white/90 text-sm font-medium">Fire Season Preparation</div>
                <div className="text-white text-2xl font-bold">{getProgressPercentage()}% Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert for High Priority Tasks */}
        {highPriorityPending.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 animate-fade-in">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-amber-800">
                  {highPriorityPending.length} high-priority task{highPriorityPending.length > 1 ? 's' : ''} need attention
                </h3>
                <p className="text-sm text-amber-700 mt-1">
                  Complete these upgrades to maximize your home's wildfire resilience
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<CheckCircle className="h-6 w-6 text-safe-600" />}
            title="Tasks Completed"
            value={`${completedTasks.length} of ${tasks.length}`}
            subtitle="upgrades finished"
            bgColor="bg-safe-50"
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6 text-fire-600" />}
            title="Total Investment"
            value={`$${completedTasks.reduce((sum: number, task: HardeningTask) => sum + task.estimatedCost, 0).toLocaleString()}`}
            subtitle="in home protection"
            bgColor="bg-fire-50"
          />
          <StatCard
            icon={<Shield className="h-6 w-6 text-primary-600" />}
            title="Resilience Gain"
            value={`+${getTotalResiliencyGain()}%`}
            subtitle="protection increase"
            bgColor="bg-primary-50"
          />
          <StatCard
            icon={<Target className="h-6 w-6 text-ember-600" />}
            title="Next Milestone"
            value={getProgressPercentage() < 50 ? "50%" : getProgressPercentage() < 80 ? "80%" : "100%"}
            subtitle="hardening target"
            bgColor="bg-ember-50"
          />
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Hardening Progress</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                Updated {new Date().toLocaleDateString()}
              </div>
            </div>
            
            <div className="progress-bar mb-4">
              <div
                className="progress-fill"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {completedTasks.length} of {tasks.length} upgrades completed
              </span>
              <span className="font-medium text-primary-600">
                {getProgressPercentage()}% complete
              </span>
            </div>

            {getProgressPercentage() > 0 && (
              <div className="mt-4 p-4 bg-safe-50 rounded-lg">
                <div className="flex items-center text-sm text-safe-700">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    Your home's resilience has increased by {getTotalResiliencyGain()}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Task Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Tasks */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recommended Actions</h2>
              <span className="badge bg-primary-100 text-primary-800">
                {pendingTasks.length} remaining
              </span>
            </div>
            <div className="space-y-4">
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task: HardeningTask) => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-safe-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">All tasks completed!</h3>
                  <p className="text-gray-600">Your home is well-protected against wildfires.</p>
                </div>
              )}
            </div>
          </div>

          {/* Completed Tasks */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Completed Upgrades</h2>
              <span className="badge bg-safe-100 text-safe-800">
                {completedTasks.length} done
              </span>
            </div>
            <div className="space-y-4">
              {completedTasks.length > 0 ? (
                completedTasks.map((task: HardeningTask) => (
                  <TaskCard key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No completed tasks yet</h3>
                  <p className="text-gray-600">Start with the recommended actions to protect your home.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, bgColor }: StatCardProps) {
  return (
    <div className="card animate-fade-in hover:shadow-card-hover">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${bgColor} mr-4`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'badge badge-high';
      case 'medium': return 'badge badge-medium';
      case 'low': return 'badge badge-low';
      default: return 'badge';
    }
  };

  return (
    <Link
      to={`/task/${task.id}`}
      className="block card hover:shadow-card-hover transition-all duration-200 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {task.title}
            </h3>
            <span className={getPriorityColor(task.priority)}>
              {task.priority}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {task.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              ${task.estimatedCost.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              +{task.resiliencyGain}% resilience
            </span>
          </div>
        </div>
        <div className="ml-4 flex items-center">
          {task.completed ? (
            <CheckCircle className="h-8 w-8 text-safe-500" />
          ) : (
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
              <ShoppingCart className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
