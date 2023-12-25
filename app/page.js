'use client'
import { addDoc, collection, deleteDoc, getDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { colRef, db } from './firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { UserAuth } from './context/AuthContext'


export default function Home() {
    const [todo,setTodo]=useState([])
    const [input,setInput]=useState('')
    const { user } = UserAuth();

    //getData
    useEffect(()=>{
        const getData = async () => {
            try {
                const snapshot = await getDocs(query(collection(db, 'test'), where('userId', '==', user.uid)))
                let todos=[]
                snapshot.forEach((doc) => {
                    todos.push({...doc.data(),id:doc.id})
                });
                setTodo(todos)
            } catch (error) {
              console.error("Error getting documents: ", error);
            }
          };
        getData();
    },[user])

    //update data
    const handleChange = async (id, checked) => {
        try {
            const todoDoc = doc(db, 'test', id);
            const todoSnapshot = await getDoc(todoDoc);
            
            if (todoSnapshot.exists()) {
                const todoData = todoSnapshot.data();
                
                if (todoData.userId === user.uid) {
                    await updateDoc(todoDoc, {
                        completed: !checked
                    });
    
                    setTodo((prevTodos) =>
                        prevTodos.map((todoItem) =>
                            todoItem.id === id ? { ...todoItem, completed: !checked } : todoItem
                        )
                    );
                } else {
                    console.log("Unauthorized access to update todo item.");
                }
            }
        } catch (error) {
            console.log("Failed updating the database", error);
        }
    }

    //create todo
    const createTodo=async(e)=> {
        e.preventDefault()
        if(input===''){
            alert('Please enter a valid input')
            return
        }
        try {
            await addDoc(collection(db, 'test'), {
                userId: user.uid,
                text: input,
                completed: false
            });
        } catch (error) {
            console.log("Errorn updating the database",error) 
        }
        setInput('')
    }    

    //delete todo
    const handleDelete = async (id) => {
        try {
            const todoDoc = doc(db, 'test', id);
            const todoSnapshot = await getDoc(todoDoc);
    
            if (todoSnapshot.exists()) {
                const todoData = todoSnapshot.data();
                
                if (todoData.userId === user.uid) {
                    await deleteDoc(todoDoc);
                    console.log('Todo item deleted');
                } else {
                    console.log("Unauthorized access to delete todo item.");
                }
            }
        } catch (error) {
            console.log("Error deleting the todo", error);
        }
    }

  return (
        <main className='flex justify-center'>
            <div className="bg-gray-200 text-black flex flex-col justify-center items-center rounded w-0.5/3 m-20 p-8">
                
                <div className='text-3xl font-bold mb-4'>Todo APP</div>

                <form className='add' onSubmit={createTodo}>
                    <input type='text' value={input} onChange={(e) => { setInput(e.target.value) }} className='border-gray-300 text-black p-2 outline-none rounded' placeholder="Add a new todo"/>
                    <button type='Submit' className="bg-purple-500 text-white px-4 py-2 ml-2 rounded">+</button>
                </form>

                <div className='mt-4'>
                    {todo.map((item, index) => (
                        <div key={index} className='flex items-center justify-between bg-white rounded p-3 mt-2' style={{opacity: item.completed ? '0.5' : '1'}}>
                            
                            <div className='flex items-center'>
                                <input type="checkbox" value={item.completed} checked={item.completed} onChange={() => handleChange(item.id, item.completed)} className='mr-2'/>
                                <div className='text-gray-800' style={{ textDecoration: item.completed ? 'line-through' : 'none'}}>{item.text}</div>
                            </div>
                    
                            <div onClick={() => { handleDelete(item.id) }} className='cursor-pointer text-red-500 ml-2' style={{ marginLeft: '150px' }}  ><FontAwesomeIcon icon={faTrash}/></div>

                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
