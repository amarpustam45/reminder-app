import React from 'react';
import { FaRegEdit } from 'react-icons/fa';

const List = ({ items, editing, isChecked, checked }) => {
  return (
    <div className='item-list'>
      {items.map((itemm) => {
        const { id, item } = itemm;
        return (
          <div className='each-item' key={id}>
            <div className='item-info'>
              <input
                type='checkbox'
                id='item-check'
                name='item-check'
                className='check'
                onChange={(e) => isChecked(id, e.target.checked)}
              />
              <label className='item-name'>{item}</label>
            </div>
            <button className='edit-item'>
              <FaRegEdit className='edit-icon' onClick={() => editing(id)} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
