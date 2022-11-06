import './App.css';
import {useReducer} from "react";
import Todo from "./components/todo";
import {logDOM} from "@testing-library/react";

const initialState = {
    input: "",
    todos: [],
    editeMode: {
        editTodo: "",
        todoId: "",
        isEdited: false,
    }
}



const ACTIONS = {
    ADD_TODO: "ADD_TODO",
    UPDATE_INPUT: "UPDATE_INPUT",
    DELETE_TODO: "DELETE_TODO",
    SET_DONE: "SET_DONE",
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TODO: {
            return {
                ...state, input: "",
                todos: [...state.todos, {id: Date.now(), title: state.input, isDone: true, isCompleted: false}]
            }
        }
        case ACTIONS.UPDATE_INPUT: {
            return {...state, input: action.payload.inputValue}
        }
        case ACTIONS.DELETE_TODO: {
            const {id} = action.payload;
            return {...state, todos: state.todos.filter(todo => todo.id !== id)}
        }
        case ACTIONS.SET_DONE: {
            const {id} = action.payload;

            return {
                ...state, todos: state.todos.map(todo => {
                    if (todo.id === id) {
                        todo.isDone = !todo.isDone;
                    }
                    return todo
                })
            }
        }
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const addTodo = () => {
        dispatch({
            type: ACTIONS.ADD_TODO,
        })
    }

    const inputValue = (e) => {
        dispatch({
            type: ACTIONS.UPDATE_INPUT,
            payload: {inputValue: e.target.value}
        })
    }

    const deleteTodo = (id) => {
        dispatch({
            type: ACTIONS.DELETE_TODO,
            payload: {id}
        })
    }



    return (
        <div className={"todo"}>
            <h1>To Do List</h1>
            <input
                type="text"
                value={state.input}
                onChange={inputValue}
            />
            <button onClick={addTodo}>Add Todo</button>
            <main>
                {state.todos.map(todo => <Todo
                    {...todo}
                    key={todo.id}
                    deleteTodo={deleteTodo}
                    dispatch={dispatch}
                    // isDoneTodo={isDoneTodo}
                />)}
            </main>
        </div>
    )
}

export default App;
