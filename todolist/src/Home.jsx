import React, { useEffect, useState } from 'react';
import Create from './create';
import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsCircleFill } from 'react-icons/bs';
import { BsFillCheckCircleFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/'+id)
            .then(result => { 
                location.reload()
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
            .then(result => { 
                location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='home'>
            <h2>Todo List</h2>
            <Create />
            {
                todos.length === 0
                ?
                    <div><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    // eslint-disable-next-line react/jsx-key
                    <div className='task'>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                            : <BsCircleFill className='icon' />
                            }
                            
                            <span className={todo.done ? 'task_item line_through' : 'task_item'}>{todo.task}</span>
                        </div>
                        <div>
                            <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill className='icon' /></span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;