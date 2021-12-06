import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './components/List';
import './App.css';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const App = () => {
  const [todo, setTodo] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo && editID) {
      setList(
        list.map((items) => {
          if (items.id === editID) {
            return { ...items, item: todo };
          }
          return items;
        })
      );
      setTodo('');
      setEditID(null);
      setIsEditing(false);
    } else if (todo) {
      const newItem = { id: uuidv4(), item: todo, check: false };
      setList([...list, newItem]);
      setTodo('');
    }
  };

  const editing = (id) => {
    const getItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setTodo(getItem.item);
  };

  const isChecked = (id) => {
    const newList = list.map((items) => {
      if (items.id === id) {
        return { ...items, check: !items.check };
      }
      return items;
    });
    setList(newList);
  };

  const clearCompleted = () => {
    setList(list.filter((item) => item.check === false));
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className='container'>
      <form onSubmit={handleSubmit}>
        <h1 className='todo'>my todo</h1>
        <div className='controls'>
          <input
            type='text'
            className='todo-input'
            id='name'
            value={todo}
            placeholder='Walk the dog'
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type='submit' className='todo-btn'>
            {isEditing ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>
      <div className='todo-list'>
        <List items={list} editing={editing} isChecked={isChecked} />
      </div>
      <button
        className='clear-completed'
        type='button'
        onClick={clearCompleted}
      >
        clear completed
      </button>
      {/* </div> */}
    </section>
  );
};

export default App;
