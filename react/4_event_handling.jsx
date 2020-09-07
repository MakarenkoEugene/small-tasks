// Event handling

// События в React именуются в стиле camelCase вместо нижнего регистра.
// С JSX вы передаёте функцию как обработчик события вместо строки.

// Ещё одно отличие — в React нельзя предотвратить обработчик события по умолчанию, вернув false. Нужно явно вызвать preventDefault.

// При обращении к this в JSX-колбэках необходимо учитывать, что методы класса в JavaScript по умолчанию не привязаны к контексту.
// this.handleClick = this.handleClick.bind(this);
// экспериментальным синтаксисом
// handleClick = () => {
//   console.log('значение this:', this);
// }

// <button onClick={this.handleClick}>
// <button onClick={() => this.handleClick()}>
// Рекомендуем делать привязку в конструкторе или использовать синтаксис полей классов, чтобы избежать проблем с производительностью.

// Ваши обработчики событий получают экземпляр SyntheticEvent, это кроссбраузерная обёртка над нативным экземпляром события. У неё такой же интерфейс, как и у нативного события, включая методы stopPropagation() и preventDefault(). Эта обёртка помогает событиям работать одинаково во всех браузерах.

// Если вам всё-таки нужно получить нативное браузерное событие, обратитесь к атрибуту nativeEvent

// останавливает всплытие - нужно вручную вызывать e.stopPropagation() или e.preventDefault()

//  Нельзя использовать синтетические события асинхронно.
import React from "react";
import ReactDOM from "react-dom";

function A() {
  function onClick(event) {
    console.log("onClick - bubbling");

    // Если вы всё же хотите обратиться к полям события асинхронно, вам нужно вызвать event.persist() на событии. Тогда оно будет извлечено из пула, что позволит вашему коду удерживать ссылки на это событие.
    // event.persist()

    console.log(event); // => SyntheticEvent-объект.
    console.log(event.type); // => "click"

    const eventType = event.type; // => "click"

    setTimeout(function () {
      console.log(event.type); // => null
      console.log(eventType); // => "click"
    }, 0);
  }

  function onClickCapture() {
    console.log("onClickCapture - capturing");
  }

  // используйте onClickCapture, чтобы обработать событие на фазе перехвата.
  return (
    <div>
      <button onClick={onClick} onClickCapture={onClickCapture}>Click</button>
    </div>
  );
}

ReactDOM.render(<A />, document.getElementById("root"));

// React нормализует события так, чтобы они содержали одинаковые свойства во всех браузерах.