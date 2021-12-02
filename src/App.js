import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './components/List';
import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo) {
      const newItem = { id: uuidv4(), item: todo };
      setList([...list, newItem]);
      setTodo('');
    }
  };

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
            add
          </button>
        </div>
      </form>
      <div className='todo-list'>
        <List items={list} />
      </div>
      <button className='clear-completed' type='button'>
        clear completed
      </button>
    </section>
  );
};

export default App;
