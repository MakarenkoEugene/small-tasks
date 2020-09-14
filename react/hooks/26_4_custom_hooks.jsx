// Custom hooks

// Создание пользовательских хуков позволяет вам перенести логику компонентов в функции, которые можно повторно использовать.

// Когда мы хотим, чтобы две JavaScript-функции разделяли какую-то логику, мы извлекаем её в третью функцию. И компоненты и хуки являются функциями, поэтому с ними это тоже работает!

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function subscribeToFriendStatus(id, callBack) {
  const timer = setTimeout(() => {
    console.log("asdasd");
    callBack({ isOnline: Boolean(id % 2) });
  }, 3000);

  return () => clearTimeout(timer);
}

// Пользовательский хук — это JavaScript-функция, имя которой начинается с «use», и которая может вызывать другие хуки.

// Извлечение логики в пользовательский хук
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    return subscribeToFriendStatus(friendID, handleStatusChange);
  }, [isOnline]);

  useEffect(() => {
    console.log(`online status user ${friendID} did change on: ${isOnline}`);
  }, [isOnline]);

  return isOnline;
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);
  const [show, setShow] = useState(true);

  if (!show) return null;
  return (
    <>
      <li style={{ color: typeof isOnline === "boolean" ? (isOnline ? "green" : "gray") : "black" }}>
        {props.friend.name}
      </li>
      <br />
      <button onClick={() => setShow(false)}>Unsubscribe</button>
    </>
  );
}

// Пользовательские хуки — это скорее соглашение, соответствующее дизайну хуков, нежели чем возможность самого React.

//Пользовательские хуки предлагают гибкую логику совместного использования, которая раньше была невозможна в React-компонентах.

ReactDOM.render(<FriendListItem friend={{ id: 1, name: "Eugene" }} />, document.getElementById("root"));
