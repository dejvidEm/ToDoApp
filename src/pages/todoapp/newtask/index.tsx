import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TaskData {
  taskMeno: string;
  taskText: string;
  taskDatum: string;
}

const TodoForm: React.FC = () => {
  const [taskData, setTaskData] = useState<TaskData>({
    taskMeno: '',
    taskText: '',
    taskDatum: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://654e9cfacbc325355743036b.mockapi.io/todoTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTaskData({
        taskMeno: '',
        taskText: '',
        taskDatum: '',
      });
    } catch (error) {
      console.error('Error creating new task:', error);
    }
  };

  return (
    <main className='w-[500px] h-[300px] mx-auto pt-20 text-center'>
      <form onSubmit={handleFormSubmit}>
        <label>
          Task Title Meno:
          <input type="text" name="taskMeno" value={taskData.taskMeno} onChange={handleInputChange} /><br />
        </label>
        <label>
          Task Title Text:
          <input type="text" name="taskText" value={taskData.taskText} onChange={handleInputChange} /><br />
        </label>
        <label>
          Task Title Datum:
          <input type="date" name="taskDatum" value={taskData.taskDatum} onChange={handleInputChange} /><br />
        </label>
        <button type="submit">Add Task</button>
      </form>
      <Link href="/todoapp" className='underline'>Vratiť sa na obrazovku s Taskami</Link>
    </main>
  );
};

export default TodoForm;





