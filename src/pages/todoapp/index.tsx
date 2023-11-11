import Link from 'next/link';
import React, { useState, useEffect } from 'react';


interface Task {
  id: number;
  taskMeno: string;
  taskText: string;
  taskDatum: string;
  taskDone: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://654e9cfacbc325355743036b.mockapi.io/todoTask');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskToggle = async (taskId: number, taskDone: boolean) => {
    try {
      const response = await fetch(`https://654e9cfacbc325355743036b.mockapi.io/todoTask/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskDone: !taskDone }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, taskDone: !task.taskDone } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskDelete = async (taskId: number) => {
    try {
      const response = await fetch(`https://654e9cfacbc325355743036b.mockapi.io/todoTask/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='w-[500px] h-[300px] mx-auto pt-20 text-center'>
    <div className='w-[500px] mx-auto pt-20 text-center'>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>Meno:</strong> {task.taskMeno} | <strong>Text:</strong> {task.taskText} |{' '}
            <strong>Datum:</strong> {task.taskDatum} |{' '}
            <label>
              <input
                type="checkbox"
                checked={task.taskDone}
                onChange={() => handleTaskToggle(task.id, task.taskDone)}
              />{' '}
              Done
            </label>
            {' '}
            <button onClick={() => handleTaskDelete(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
    <Link href="/todoapp/newtask" className="underline">Pridať nový Task</Link><br />
    <Link href="/" className='underline'>Vratiť sa na domovskú obrazovku</Link>
    </main>
  );
};

export default TaskList;