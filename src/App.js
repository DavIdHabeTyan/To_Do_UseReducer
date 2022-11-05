import './App.css';
import {useReducer} from "react";

import Todo from "./components/todo";


const initialState = {
    input: "",
    todos: [],
    editeMode: {
        todoId: "",
        isEditMode: false,
        editTodo: "",
    }
}

const ACTIONS = {
    ADD_TODO: "ADD_TODO",
    DELETE_TODO: "DELETE_TODO",
    EDIT_TODO: "EDIT_TODO",
    UPDATE_INPUT: "UPDATE_INPUT",
    SET_DONE: "SET_DONE"
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_TODO: {
            return {
                ...state, input: "", todos: [...state.todos,
                    {id: Math.random(), title: state.input, isDone: false, isCompleted: false}
                ]
            };
        }
        case ACTIONS.UPDATE_INPUT: {
            return {...state, input: action.payload.inputValue}
        }
        // case ACTIONS.DELETE_TODO: {
        //     const {payload: {id}} = action;
        //     return {...state, todos: state.todos.filter(todo => todo.id !== id)};
        // }
        case ACTIONS.SET_DONE: {
            const { id } = action.payload;
            return {...state, todos: state.todos.map(todo => {
                if(todo.id === id) {
                    todo.isDone = !todo.isDone
                }
                return todo
                })}
        }
        default: return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    function handleAdTodo() {
        dispatch({
            type: ACTIONS.ADD_TODO,
        })
    }

    function handleInputValue(e) {
        dispatch({
            type: ACTIONS.UPDATE_INPUT,
            payload: {inputValue: e.target.value,}
        })
    }

    function handleDeleteTodo(e, id) {
        e.stopPropagation()
        dispatch({
            type: ACTIONS.DELETE_TODO,
            payload: { id }
        })
    }

    function onDone( id) {
        dispatch({
            type: ACTIONS.SET_DONE,
            payload: {id}
        })
    }

    return (
        <div>
            <input
                type="text"
                value={state.input}
                onChange={(e) => handleInputValue(e)}
            />
            <button onClick={handleAdTodo}>Add</button>
            <div>
                {state.todos.map(todo => <Todo
                    editeMode={state.editeMode}
                    key={todo.id}
                    onDone={onDone}
                    {...todo}

                    handleDeleteTodo={handleDeleteTodo}
                />)}
            </div>
        </div>
    );
}

export default App;
