import React from 'react';

const Todo = ({id, title, isDone, deleteTodo, dispatch,}) => {

    return (
        <div>
            <span className={isDone ? "isDone" : ""} onClick={() => dispatch({type: "SET_DONE", payload:{id}})}>{title}</span>

            <button onClick={() => deleteTodo(id)}>Delete</button>
        </div>
    );
};

export default Todo;