import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import '../styles/grocery.css';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //display alert
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      //editing
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      //show alert
      //add item to the list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
      showAlert(true, 'success', 'item added');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <>
      <main className='container'>
        <h1 className='title'>grocery items</h1>

        <form className='form' onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <input
            className='item-add'
            type='text'
            name='addItem'
            id='item-add'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className='submit' type='submit'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </form>

        {list.length > 0 && (
          <div className='item-list-container'>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className='clear' type='button' onClick={clearList}>
              clear all items
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
