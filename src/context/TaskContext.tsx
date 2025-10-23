import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockTasks } from '../data/mockData';
import type { HardeningTask } from '../types';

interface TaskContextType {
  tasks: HardeningTask[];
  updateTaskCompletion: (taskId: string, completed: boolean) => void;
  getTaskById: (id: string) => HardeningTask | undefined;
  getCompletedTasks: () => HardeningTask[];
  getPendingTasks: () => HardeningTask[];
  getProgressPercentage: () => number;
  getTotalResiliencyGain: () => number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<HardeningTask[]>(mockTasks);

  const updateTaskCompletion = (taskId: string, completed: boolean) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed);
  };

  const getPendingTasks = () => {
    return tasks.filter(task => !task.completed);
  };

  const getProgressPercentage = () => {
    if (tasks.length === 0) return 0;
    return Math.round((getCompletedTasks().length / tasks.length) * 100);
  };

  const getTotalResiliencyGain = () => {
    return getCompletedTasks().reduce((sum, task) => sum + task.resiliencyGain, 0);
  };

  const contextValue: TaskContextType = {
    tasks,
    updateTaskCompletion,
    getTaskById,
    getCompletedTasks,
    getPendingTasks,
    getProgressPercentage,
    getTotalResiliencyGain,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
