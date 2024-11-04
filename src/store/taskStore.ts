import { create } from 'zustand';
import { produce } from 'immer';
import { Task, Column } from '../types/task';

interface TaskState {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  moveTask: (taskId: string, sourceCol: string, destCol: string, newIndex: number) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: {},
  columns: {
    'col-1': { id: 'col-1', title: 'To Do', taskIds: [] },
    'col-2': { id: 'col-2', title: 'In Progress', taskIds: [] },
    'col-3': { id: 'col-3', title: 'Review', taskIds: [] },
    'col-4': { id: 'col-4', title: 'Done', taskIds: [] },
  },
  columnOrder: ['col-1', 'col-2', 'col-3', 'col-4'],

  addTask: (task) =>
    set(
      produce((state) => {
        state.tasks[task.id] = task;
        state.columns['col-1'].taskIds.push(task.id);
      })
    ),

  updateTask: (id, updates) =>
    set(
      produce((state) => {
        state.tasks[id] = { ...state.tasks[id], ...updates };
      })
    ),

  moveTask: (taskId, sourceCol, destCol, newIndex) =>
    set(
      produce((state) => {
        const sourceTaskIds = state.columns[sourceCol].taskIds;
        const destTaskIds = state.columns[destCol].taskIds;
        
        const sourceIndex = sourceTaskIds.indexOf(taskId);
        sourceTaskIds.splice(sourceIndex, 1);
        
        destTaskIds.splice(newIndex, 0, taskId);
        
        if (sourceCol !== destCol) {
          state.tasks[taskId].status = state.columns[destCol].title.toUpperCase().replace(' ', '_') as Task['status'];
        }
      })
    ),

  deleteTask: (id) =>
    set(
      produce((state) => {
        Object.values(state.columns).forEach((column) => {
          column.taskIds = column.taskIds.filter((taskId) => taskId !== id);
        });
        delete state.tasks[id];
      })
    ),
}));