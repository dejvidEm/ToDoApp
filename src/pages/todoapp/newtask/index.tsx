import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BsArrowLeftCircle } from "react-icons/bs";

// importy yup a formik ktore pouzivam na validaciu user inputov z formularu
import * as Yup from 'yup';
import { useFormik } from 'formik';

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

  // vlaidacia dat cez yup metody
const validationSchema = Yup.object().shape({
    taskMeno: Yup.string().required('Názov úlohy je potrebné vyplniť!'),
    taskDatum: Yup.string().required('Deadline úlohy je potrebné vyplniť!'),
  });

  // s formikom som pracoval prvykrat, snazil som sa to spravit jednoducho tak aby som tomu chapal a vedel ho pouzit aj pri inych projektoch
  const formik = useFormik({
    initialValues: {
      taskMeno: '',
      taskText: '',
      taskDatum: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://654e9cfacbc325355743036b.mockapi.io/todoTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        formik.resetForm();
      } catch (error) {
        console.error('Error creating new task:', error);
      }
    },
  });

  // funkcia vytvorena pre minimalizaciu kodu, neviem ci je efektivna ale davala mi zmysel, za opravu budem rad
  const renderInput = (name: keyof TaskData, label: string, type: string = 'text') => (
    <div key={name} className='p-2 flex justify-center'>
      <label className='gap-4 flex flex-row items-center'>
        <h1 className='font-md sm:text-lg font-medium text-color-text'>{label}:</h1>
        <div>
        <input
          type={type}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='rounded-lg h-9 ml-3 pr-7 pl-2'
        />
        {formik.touched[name] && formik.errors[name] && (
          <div className="error text-red-500">{formik.errors[name]}</div>
        )}</div>
      </label>
    </div>
  );

  return (
    <main className="w-auto h-screen mx-auto pt-20 text-center bg-bg-main">
      <form onSubmit={formik.handleSubmit} className=''>
        {renderInput('taskMeno', '*Názov úlohy')}
        {renderInput('taskText', 'Text úlohy')}
        {renderInput('taskDatum', '*Deadline úlohy', 'datetime-local')}
        <p className='pb-6 text-blue-700'>Polia označené * sú povinné</p>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Pridať úlohu</button>

      </form>
      <Link href="/todoapp" className="flex justify-center text-center items-center gap-2">
      <button type="button" className="flex items-center gap-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-400 dark:text-blue-400 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-900"><BsArrowLeftCircle size={20}/>Naspäť</button>
      </Link>
    </main>
  );
};

export default TodoForm;





