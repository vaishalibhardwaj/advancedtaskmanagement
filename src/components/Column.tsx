import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TaskCard } from './TaskCard';
import { Column as ColumnType, Task } from '../types/task';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

export const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  return (
    <div className="w-80 bg-gray-50 rounded-lg p-4">
      <h2 className="font-semibold text-gray-700 mb-4 flex items-center justify-between">
        {column.title}
        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
          {tasks.length}
        </span>
      </h2>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[calc(100vh-12rem)] ${
              snapshot.isDraggingOver ? 'bg-gray-100' : ''
            } rounded-lg transition-colors`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};