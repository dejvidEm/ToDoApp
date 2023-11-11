import Link from 'next/link';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { AiOutlineDelete } from "react-icons/ai";



interface Task {
  id: number;
  taskMeno: string;
  taskText: string;
  taskDatum: string;
  taskDone: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [listName, setListName] = useState<string>('Nový Zoznam');

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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleListNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  return (
    <main className='mx-auto pt-20 text-center bg-bg-main h-screen'>
    <div className='max-w-[1024px] sm:px-0 px-10 mx-auto pt-20 text-center'>
    <h2 className='text-3xl font-bold mb-4'>{listName}</h2>
    <div className='mb-4 flex flex-col items-center'>
      <label className='mb-2'>
        Zmeniť názov zoznamu:{' '}
        <input
          type="text"
          value={listName}
          onChange={handleListNameChange}
          className='border rounded p-2'
        />
      </label>
      <button onClick={() => alert(`Zmenený názov na: ${listName}`)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Potvrdiť</button>

    </div>

    <label className='mb-4 block'>
      <input
        type="checkbox"
        checked={showCompleted}
        onChange={() => setShowCompleted(!showCompleted)}
        className='mr-2'
        />Zobraziť Dokončené úlohy</label>

    <input
      type="text"
      placeholder="Vyhľadávať podľa názvu"
      value={searchTerm}
      onChange={handleSearchChange}
      className='w-full border rounded p-2 mb-4'
    />
    <ul className='text-left py-3 mx-10'>
      {tasks
        .filter((task) => (showCompleted ? true : !task.taskDone))
        .filter((task) =>
          task.taskMeno.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((task) => (
          <li key={task.id} className='mb-2'>
            <strong>{task.taskMeno}</strong> | {task.taskText} |{' '}
            <strong className='text-red-900'>Deadline:</strong> {task.taskDatum} |{' '}
            <label className='mr-2'>
              <input
                type="checkbox"
                checked={task.taskDone}
                onChange={() => handleTaskToggle(task.id, task.taskDone)}
              />{' '}
              Done
            </label>
            {' '}
            <button onClick={() => handleTaskDelete(task.id)} className='bg-red-500 text-white px-2 py-1 rounded'>
              <AiOutlineDelete size={20}/>
            </button>
          </li>
        ))}
    </ul>

    <div className='flex justify-around py-10'>
      <Link href="/todoapp/newtask" className="underline"><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Pridať novú úlohu</button></Link>
      <Link href="/" className='underline'><button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-400 dark:text-blue-400 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-900">Návrat na domovskú obrazovku</button></Link>
    </div>

  </div>

</main>
  );
};

export default TaskList;