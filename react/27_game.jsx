import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";

const themes = {
  light: {
    name: "light",
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    name: "dark",
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = React.createContext(null);

function Button({ onChangeTheme }) {
  const theme = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme.background, color: theme.foreground, float: "right" }}
      onClick={() => onChangeTheme()}
    >
      Change Theme
    </button>
  );
}

function TodoItem({ item, onChangeCompleted, removeTodo }) {
  const theme = useContext(ThemeContext);
  return (
    <li>
      <input
        type="checkbox"
        id={`item_${item.id}_checkbox`}
        style={{ background: theme.background }}
        checked={item.completed}
        onChange={() => onChangeCompleted(item.id)}
      />
      <label htmlFor={`item_${item.id}_checkbox`} style={{ color: theme.foreground, padding: "10px" }}>
        {item.title}
      </label>
      <input
        style={{ background: theme.background, color: theme.foreground, marginBottom: "10px" }}
        type="button"
        value="Remove"
        onClick={() => removeTodo(item.id)}
      />
    </li>
  );
}

function TodoList({ todos, removeTodo, onChangeCompleted }) {
  return (
    <ul style={{ padding: "10px 30px" }}>
      {todos.map((item) => (
        <TodoItem item={item} key={item.id} removeTodo={removeTodo} onChangeCompleted={onChangeCompleted} />
      ))}
    </ul>
  );
}

function Form({ onAddTodo, value, onChangeValue }) {
  const theme = useContext(ThemeContext);

  return (
    <form onSubmit={onAddTodo} style={{ padding: "20px" }}>
      <input
        type="text"
        value={value}
        onChange={onChangeValue}
        style={{ background: theme.background, color: theme.foreground }}
      />
      <button type="submit" style={{ background: theme.background, color: theme.foreground }}>
        Add
      </button>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [inputValue, setInputValue] = useState(sessionStorage.getItem("inputValue") || "");
  const [theme, setTheme] = useState(themes[localStorage.getItem("theme") || "light"]);

  const onChangeTheme = () => {
    setTheme((preState) => {
      return preState.name === "dark" ? themes.light : themes.dark;
    });
  };

  const onAddTodo = (e) => {
    e.preventDefault();

    setTodos([...todos, { title: inputValue, id: Number(new Date()), completed: false }]);
    setInputValue("");
  };

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const onChangeCompleted = (id) => {
    setTodos(todos.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  useEffect(() => {
    document.title = todos.length ? todos[todos.length - 1].title : "todo";
  }, [todos.length]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    sessionStorage.setItem("inputValue", inputValue);
  }, [inputValue]);

  useEffect(() => {
    localStorage.setItem("theme", theme.name);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <Button onChangeTheme={onChangeTheme} />
      <div style={{ backgroundColor: theme.background, minHeight: "100vh" }}>
        <Form onAddTodo={onAddTodo} value={inputValue} onChangeValue={onChangeInputValue} />
        <TodoList todos={todos} removeTodo={removeTodo} onChangeCompleted={onChangeCompleted} />
      </div>
    </ThemeContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
