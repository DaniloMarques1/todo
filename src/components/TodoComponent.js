import React, { useState,  } from 'react';

import  './TodoComponent.css';

import deleteImg from '../assets/delete.svg';

export default function Todo() {
    const getTasksLocalStorage = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    const [tasks, setTasks]  = useState(getTasksLocalStorage);
    const [input, setInput] = useState('');

    function addTask() {
        //adicionamos o que foi digitado no input (caso tenha digitado algo) ao estado e salvando o estado no localStorage
        if (input.length > 0) {
            const id = tasks.length === 0 ? 1 : Number(tasks[tasks.length - 1].id) + 1
            const task = {id : id, task : input, checked: false, }
            //precisamos criar um novo array para o estado pois o react precisa saber que algo mudou
            const arr = [...tasks]
            arr.push(task)
            setTasks(arr)
            localStorage.setItem("tasks", JSON.stringify(arr));
            setInput("")
        }
    }

    function check(event,id) {
        setTasks(
            tasks.map(task => {
                if (task.id !== id) return task
                return {
                    id : task.id,
                    task : task.task,
                    checked: !task.checked,
                }
            })
        )
    } 

    function cleanTasks() {
        const arr = tasks.filter(task => task.checked !== true)
        console.log("new tasks: ", arr)
        setTasks(arr);
        localStorage.setItem("tasks", JSON.stringify(arr));
    }

    return (
        <div className='container'>
            <h1>Todo</h1>
            <form>
                <div className='form'>
                    <label className='label' htmlFor='task_input'>Task name: </label>
                    <input autoFocus onChange={(e) => setInput(e.target.value) } value={input} className='input' placeholder='Your task name'  id='task_input' type="text" />
                    <button onClick={addTask}  className='button' id='button_add' type='button'>Add</button>
                </div>
            </form>
            <div id='tasks'>
                <div className="deleteImg">
                    <img onClick={cleanTasks} src={deleteImg} alt='Delete tasks' />
                </div>
                <ul>
                    {tasks.map(task => (
                      <li key = {task.id}>
                            {task.task}  <input onClick={(event) => check(event, task.id)} type="checkbox" />
                      </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
