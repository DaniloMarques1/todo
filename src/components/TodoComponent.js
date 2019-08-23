import React, { useState } from 'react';

import  './TodoComponent.css';

import deleteImg from '../assets/delete.svg';

export default function Todo() {
    const [tasks, setTasks]  = useState([]);
    const [input, setInput] = useState('');

    function addTask() {
        
        if (input.length > 0) {
            const id = tasks.length === 0 ? 1 : Number(tasks[tasks.length - 1].id) + 1
            const task = {id : id, task : input}
            const arr = [...tasks]
            arr.push(task)
            setTasks(arr)
            setInput("")
        }
    }

    function cleanTasks(event) {
        //pega o id da task que foi clicada
        const id = event.target.dataset.key;
        //filtra as tasks devolvendo um novo array de tasks exceto pela task que possui o id clicado
        const newArr = tasks.filter((task) => task.id !== Number(id))
        //seta o novo array no state
        setTasks(newArr)
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
                
                <ul>
                    {tasks.map(task => (
                      <li key = {task.id}>
                            {task.task}  <img onClick={cleanTasks} data-key={task.id} className='deleteImg' src={deleteImg} alt='Delete tasks' />
                      </li>  
                    ))}
                </ul>
            </div>
        </div>
    );
}