import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../types/task';
import { Clock, Tag, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  index: number;
}

const priorityColors = {
  LOW: 'bg-blue-100 text-blue-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-3 bg-white rounded-lg shadow-sm border border-gray-200 
            ${snapshot.isDragging ? 'shadow-lg' : ''} hover:shadow-md transition-shadow`}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-gray-900">{task.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{format(new Date(task.dueDate), 'MMM d')}</span>
              </div>
            )}
            
            {task.assignee && (
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  {task.assignee[0].toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {task.tags.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};