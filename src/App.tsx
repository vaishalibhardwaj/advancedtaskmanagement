import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Column } from './components/Column';
import { TaskForm } from './components/TaskForm';
import { useTaskStore } from './store/taskStore';
import { Layout, BarChart2 } from 'lucide-react';

function App() {
  const { tasks, columns, columnOrder, moveTask } = useTaskStore();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(
      draggableId,
      source.droppableId,
      destination.droppableId,
      destination.index
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Layout className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">TaskFlow Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">
                <BarChart2 size={20} />
                <span>Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {columnOrder.map((columnId) => {
              const column = columns[columnId];
              const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

              return <Column key={column.id} column={column} tasks={columnTasks} />;
            })}
          </div>
        </DragDropContext>
      </main>

      <TaskForm />
    </div>
  );
}

export default App;