import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './components/List';
import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState('');
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

  const isChecked = (id, value) => {
    setList(
      list.map((items) => {
        if (items.id === id) {
          return { ...items, check: value };
        }
        return items;
      })
    );
    console.log(list);
  };

  const clearCompleted = () => {};

  return (
    <section className='container'>
      <form onSubmit={handleSubmit}>
        <h1 className='todo'>todo</h1>
        <div className='controls'>
          <input
            type='text'
            className='todo-input'
            id='name'
            value={todo}
            placeholder='Wash Car'
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
    </section>
  );
};

export default App;
