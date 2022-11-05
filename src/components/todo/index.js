import React from 'react';

const Todo = (props) => {
    const {id,  title, isDone, handleDeleteTodo, onDone} = props

    return (
        <div  onClick={ () => onDone(id)}  className={isDone ? "todos" : ""}>
                    <span> {title}</span>
                    <button onClick={ (e) =>handleDeleteTodo(e, id)}>Delete</button>
        </div>
    );
};

export default Todo;