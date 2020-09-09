//  portals

// Порталы позволяют рендерить дочерние элементы в DOM-узел, который находится вне DOM-иерархии родительского компонента.

// ReactDOM.createPortal(child, container)
// Первый аргумент (child) — это любой React-компонент, который может быть отрендерен, такой как элемент, строка или фрагмент. Следующий аргумент (container) — это DOM-элемент.

// React монтирует новый div и рендерит в него дочерние элементы
// return (
//   <div>
//     {this.props.children}
//   </div>
// );

// React *не* создаёт новый div. Он рендерит дочерние элементы в `domNode`.
// `domNode` — это любой валидный DOM-узел, находящийся в любом месте в DOM.
// return ReactDOM.createPortal(
//   this.props.children,
//   domNode
// );

// Типовой случай применения порталов — вам нужно чтобы дочерний элемент визуально выходил за рамки своего контейнера

// Такие возможности, как контекст, работают привычным образом, даже если потомок является порталом, поскольку сам портал всё ещё находится в React-дереве, несмотря на его расположение в DOM-дереве.

// Так же работает и всплытие событий. Событие, сгенерированное изнутри портала, будет распространяться к родителям в содержащем React-дереве, даже если эти элементы не являются родительскими в DOM-дереве.

import React from "react";
import ReactDOM from "react-dom";

// Это два соседних контейнера в DOM
const root = document.getElementById("root");
const bModal = document.getElementById("modal");

function Child() {
  // Событие клика на этой кнопке будет всплывать вверх к родителю,
  // так как здесь не определён атрибут 'onClick'
  return <button>Кликните</button>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Эта функция будет вызвана при клике на кнопку в компоненте Child,
    // обновляя состояние компонента Parent, несмотря на то,
    // что кнопка не является прямым потомком в DOM.
    this.setState((state) => ({
      clicks: state.clicks + 1,
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Количество кликов: {this.state.clicks}</p>
        <hr />
        {ReactDOM.createPortal(<Child />, bModal)}
      </div>
    );
  }
}

ReactDOM.render(<App />, root);
