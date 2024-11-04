export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  tags: string[];
  createdAt: Date;
  dueDate?: Date;
  assignee?: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}