import Link from 'next/link';
import React, { useState, useEffect, ChangeEvent } from 'react';

// importy pre react ikonky
import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowLeftCircle, BsPencilSquare } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";

// pouzil som tuto kniznicu na formatovanie casu v react komponente
import { format } from 'date-fns';

// vytvorenie typov v tasku
interface Task {
  id: number;
  taskMeno: string;
  taskText: string;
  taskDatum: string;
  taskDone: boolean;
}

const TaskList: React.FC = () => {
  // sledovanie stavov v premenných
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [listName, setListName] = useState<string>('Nový Zoznam');


  // useeffekt pre jednorazove nacitanie taskov pri otvoreni routu
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

  // fetch poziadavka na zmenu stavu tasku v zozname (dokonceny/nedokonceny)
  const handleTaskZmenu = async (taskId: number, taskDone: boolean) => {
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

  // fetch poziadavka na vymazanie tasku
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

  // funkcia ktorá sleduje stav hľadania a v react komponente filtruje dáta
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // funkcia ktorá pracuje so stavom zmeny názvu, po zmene uloží nové meno listu
  const handleRename = (e: ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm');
  };

  return (
    <main className='mx-auto pt-20 text-center bg-bg-main h-screen'>
      <div className='max-w-[1024px] sm:px-5 px-3 mx-auto pt-20 text-center'>
        <h2 className='text-3xl font-bold mb-4'>{listName}</h2>
        <div className='mb-4 flex flex-col items-center'>
          <label className='mb-2'>
            Zmeniť názov zoznamu:{' '}
            <input
              type="text"
              value={listName}
              onChange={handleRename}
              className='border rounded p-2'
            />
          </label>
          <button onClick={() => alert(`Zmenený názov na: ${listName}`)} className="flex gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Premenovať<BsPencilSquare size={20}/></button>
        </div>

        <label className='mb-4 block'>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
            className='mr-2'
          />Zobraziť Dokončené úlohy
        </label>
        <div className='flex flex-row gap-3 justify-center items-center'>
          <input
            type="text"
            placeholder="Vyhľadávať podľa názvu"
            value={search}
            onChange={handleSearch}
            className='w-1/3 border rounded p-2 mb-4'
          />
          <BiSearchAlt size={25} className="mb-3"/>
        </div>
        {tasks.length === 0 ? (
          <p className="text-red-500">Tvoj zoznam úloh je prázdny</p>
        ) : (
          <>
            {tasks.every(task => task.taskDone) && (
              <p className="text-green-500">Všetky úlohy sú dokončené!</p>
            )}

            <ul className='text-left py-3 mx-10'>
              {tasks // filtre pre rozdelenieuloh na dokoncene, nedokoncene a search
                .filter((task) => (showCompleted ? true : !task.taskDone))
                .filter((task) =>
                  task.taskMeno.toLowerCase().includes(search.toLowerCase()) 
                  //porovnanie vyhladavania s taskami
                )
                .map((task) => (
                  // tato cast kodu by sa dala este zjednodusit bez opakovaneho
                  <li key={task.id} className='mb-2 border p-3 sm:p-5 border-gray-400 rounded-xl'>
                    <div className="sm:flex">
                      <div className="sm:w-1/2">
                        <strong>{task.taskMeno}</strong>
                      </div>
                      <div className="sm:w-1/2">
                        <strong className='text-red-900 px-2'>Deadline:</strong> {formattedDate(task.taskDatum)}
                      </div>
                    </div>
                    <div className="sm:flex">
                      <div className="sm:w-full">
                        {task.taskText}
                      </div>
                      <div className="sm:w-full mt-2">
                        <label className='mr-2 px-2'>
                          <input
                            type="checkbox"
                            checked={task.taskDone}
                            onChange={() => handleTaskZmenu(task.id, task.taskDone)}
                          />{' '}
                          Dokončené
                        </label>
                        {' '}
                        <button onClick={() => handleTaskDelete(task.id)} className='bg-red-500 text-white px-2 py-1 rounded'>
                          <AiOutlineDelete size={20}/>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        )} 

        <div className='flex justify-around py-10'>
          <Link href="/todoapp/newtask"><button className="flex gap-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><IoAddCircleOutline size={20}/>Pridať úlohu</button></Link>
          <Link href="/"><button type="button" className="flex items-center gap-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-400 dark:text-blue-400 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-900"><BsArrowLeftCircle size={20}/>Návrat</button></Link>
        </div>
      </div>
    </main>
  );
};

export default TaskList;