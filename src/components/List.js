import React from 'react';

const List = ({ items }) => {
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
              />
              <label className='item-name'>{item}</label>
            </div>
            <button className='edit-item'>edit</button>
          </div>
        );
      })}
    </div>
  );
};

export default List;
