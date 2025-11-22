import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import { socketService } from '../services/socket';
import type { Task } from '../types/api.types';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';
import { LogOut, Plus } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3 touch-none">
      <Card className="p-4 flex justify-between items-center hover:shadow-md transition cursor-grab active:cursor-grabbing">
        <span className="font-medium text-gray-800 dark:text-gray-200">{task.title}</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
          {task.status}
        </span>
      </Card>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      socketService.connect(token);
      socketService.joinProject(1);

      socketService.on('task_created', (newTask: Task) => {
        setTasks((prev) => [...prev, newTask]);
        toast.success('Нове завдання (Real-time)!');
      });
      
      socketService.on('new_notification', (data: any) => {
        toast(data.message, { icon: '🔔' });
      });
    }

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    setLoading(true);
    try {
        const projectId = 1; 
        await api.post('/tasks', { title: newTaskTitle, projectId });
        setNewTaskTitle('');
    } catch (error) {
        toast.error('Помилка створення.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Мої Завдання (Live)</h1>
            <p className="text-gray-500">{user?.name}</p>
          </div>
          <Button variant="danger" size="sm" onClick={logout} className="flex items-center gap-2">
            <LogOut size={16} /> Вийти
          </Button>
        </header>

        <Card className="mb-8 p-6">
          <form onSubmit={handleCreateTask} className="flex gap-4 items-end">
            <div className="flex-1">
              <Input 
                placeholder="Назва завдання..." 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            <Button type="submit" isLoading={loading} className="flex items-center gap-2">
              <Plus size={18} /> Додати
            </Button>
          </form>
        </Card>

        <DndContext collisionDetection={closestCenter}>
          <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
                {tasks.length === 0 && <p className="text-center text-gray-500">Список порожній.</p>}
                {tasks.map((task) => <SortableItem key={task.id} task={task} />)}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default DashboardPage;