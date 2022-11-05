import React from 'react';

const Todo = (props) => {
    const {id,  title,  handleDeleteTodo,} = props

    return (
        <div  >

                    <span> {title}</span>
                    <button onClick={ (e) =>handleDeleteTodo(e, id)}>Delete</button>

        </div>
    );
};

export default Todo;