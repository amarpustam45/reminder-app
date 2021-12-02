import React, { useState } from 'react';
import List from './components/List';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('its working');
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
        <List />
      </div>
    </section>
  );
};

export default App;
