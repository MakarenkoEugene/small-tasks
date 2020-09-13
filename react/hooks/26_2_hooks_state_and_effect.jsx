// useState — Мы вызываем его, чтобы наделить наш функциональный компонент внутренним состоянием. React будет хранить это состояние между рендерами. Вызов useState возвращает две вещи: текущее значение состояния и функцию для его обновления. Единственный аргумент useState — это начальное состояние.

// Хук эффекта даёт вам возможность выполнять побочные эффекты в функциональном компоненте:

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

class Example1 extends React.Component {
  constructor() {
    super();

    this.state = { count: 0 };
  }

  setCount() {
    this.setState(
      (prevState) => ({
        count: prevState.count + 1,
      }),
      (...args) => console.log("state is update", args)
    );
  }

  render() {
    return (
      <div>
        <p>Вы кликнули {this.state.count} раз(а)</p>
        <button onClick={() => this.setCount()}>Нажми на меня</button>
      </div>
    );
  }
}

function Example() {
  // Объявление новой переменной состояния «count»
  const [count, setCount] = useState(0);

  // useEffect представляет собой совокупность методов componentDidMount, componentDidUpdate, и componentWillUnmount
  console.log(useEffect);
  useEffect(() => {
    // Обновляем заголовок документа с помощью API браузера
    document.title = `Вы нажали ${count} раз`;

    // Чтобы указать, как сбросить этот эффект:
    return () => {
      console.log("Код выполняющий сброс");
    };
  }, [count]);
  // Если вы хотите запустить эффект и сбросить его только один раз (при монтировании и размонтировании), вы можете передать пустой массив ([]) вторым аргументом.

  return (
    <div>
      <p>Вы кликнули {count} раз(а)</p>
      <button onClick={() => setCount(count + 1)}>Нажми на меня</button>
    </div>
  );
}

ReactDOM.render(<Example />, document.getElementById("root"));
