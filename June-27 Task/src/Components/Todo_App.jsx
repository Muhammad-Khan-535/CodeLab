import React, { useReducer, useEffect } from "react";

const initialState = { tasks: [], input: "" };

function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, { text: state.input, completed: false }],
        input: "",
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t, i) =>
          i === action.index ? { ...t, completed: !t.completed } : t
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((_, i) => i !== action.index),
      };
    default:
      return state;
  }
}

export default function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app-container">
      <h1>Todo App</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Add a new task..."
          value={state.input}
          onChange={(e) =>
            dispatch({ type: "SET_INPUT", payload: e.target.value })
          }
        />
        <button
          className="add-btn"
          onClick={() => dispatch({ type: "ADD_TASK" })}
        >
          Add
        </button>
      </div>

      <ul className="task-list">
        {state.tasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? "completed" : ""}
            onClick={() => dispatch({ type: "TOGGLE_TASK", index })}
          >
            <span>{task.text}</span>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "DELETE_TASK", index });
              }}
              aria-label="Delete task"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
