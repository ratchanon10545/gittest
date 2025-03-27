'use client'
import React, { useState } from 'react'
import List from '../types/listtype'

function dynamicSort(property : string) {
    return function(a : any, b : any) {
        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
 }

export default function ToDoList({list}: {list: List[]}) {
    const [listdata , setListData] = useState(list)
    const [newList , setNewList] = useState('')
    // console.log(listdata)
    const ListCheck = async (e: React.ChangeEvent<HTMLInputElement> , id : number) => {
        // console.log(e.target.checked)
        const currentItem = listdata.find((item) => item.id === id)
        if (currentItem) {
            currentItem.completed = e.target.checked
        }
        
        setListData([...listdata])

        await fetch(`/api/lists/checklist/${id}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({completed: e.target.checked}),   
        }
        )
        .then((response) => response.json())}

    const AddList = async () => {
        // console.log(newList)
        if(newList === '') return
        const newId = listdata.length + 1
        const newItem = {
            id: newId,
            title: newList,
            completed: false
        }
        setListData([ newItem , ...listdata])
        setNewList('')

        await fetch('/api/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: newList}),
        })
        .then((response) => response.json())   
    }

    const DeletList = (id: number) => {
        // alert('Are you sure you want to delete this task?')
        return async () => {
            alert('Are you sure you want to delete this task?')
            const newList = listdata.filter((item) => item.id !== id)
            setListData(newList)

            await fetch(`/api/lists/${id}`, {
                method: 'DELETE',
            })
            .then((response) => response.json())
        }
    }

    const EditList = (id: number) => {
        return async () => {
            const currentItem = listdata.find((item) => item.id === id)
            if (currentItem) {
                let text;
                let newTitle = prompt("Edit List :", currentItem.title);
                if (newTitle == null || newTitle == "") {
                    text = currentItem.title;
                } else {
                    text = newTitle;
                }
                currentItem.title = text
                // console.log(listdata)
                setListData([...listdata])

                await fetch(`/api/lists/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({title: text}),
                })
                .then((response) => response.json())   
            }
            else{
                return ''
            }
        }
    }
  return (
    <div className='w-full'>
        <div className=" md:flex space-x-2 mt-4 w-full">
          <input
            type="text"
            className="text-white w-full p-2 mt-4 rounded-lg outline-1 focus:outline-blue-500"
            placeholder="Add a new task"
            value={newList}
            onChange={(e) => setNewList(e.target.value)}
          />
          <button onClick={AddList}  className="w-full p-2 mt-4 bg-blue-500 text-white rounded-lg">
            Add
          </button>
        </div>

        <div >
        {listdata.map((item) => (
            <div key={item.id} className="flex space-x-5 items-center justify-between mt-4">
                <div className='flex space-x-5 items-center justify-center'>
                    <input onChange={(e) => ListCheck(e, item.id)} type="checkbox" defaultChecked={item.completed} className='h-5 w-5' />
                    <div className={`${item.completed ? 'line-through' : ''} text-white text-xl`}>{item.title}</div>
                </div>

                <div className='flex space-x-2 items-center justify-center'>
                    <button onClick={DeletList(item.id)} className="bg-red-500 px-2 py-1 rounded-lg cursor-pointer text-white">Delete</button>
                    <button onClick={EditList(item.id)} className='bg-blue-500 px-2 py-1 rounded-lg cursor-pointer text-white'>Edit</button>
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}
