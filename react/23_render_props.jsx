// Render props

import React from "react";
import ReactDOM from "react-dom";

// Компонент с рендер-пропом берёт функцию, которая возвращает React-элемент, и вызывает её вместо реализации собственного рендера.

{
  /* <DataProvider render={(data) => <h1>Привет, {data.target}</h1>} />; */
}

// Компоненты — это основа повторного использования кода в React. Однако бывает неочевидно, как сделать, чтобы одни компоненты разделяли своё инкапсулированное состояние или поведение с другими компонентами, заинтересованными в таком же состоянии или поведении.

// Иными словами, рендер-проп — функция, которая сообщает компоненту что необходимо рендерить.

class Cat extends React.Component {
  render() {
    const { mouse } = this.props;
    return <img src="/cat.jpg" style={{ position: "absolute", left: mouse.x, top: mouse.y }} />;
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  }

  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Перемещайте курсор мыши!</h1>
        <Mouse render={(mouse) => <Cat mouse={mouse} />} />
      </div>
    );
  }
}

// Любой проп, который используется компонентом и является функцией рендеринга, технически является и «рендер-пропом».

// Использование рендер-пропа может свести на нет преимущество, которое даёт React.PureComponent, если вы создаёте функцию внутри метода render. Поверхностное сравнение пропсов всегда будет возвращать false для новых пропсов и каждый render будет генерировать новое значение для рендер-пропа.

// Чтобы решить эту проблему, вы можете определить проп как метод экземпляра.

// В случаях, когда вы не можете определить проп статически (например, вам необходимо замкнуть пропсы и/или состояние компонента), <Mouse> нужно наследовать от React.Component.

ReactDOM.render(<MouseTracker />, document.getElementById("root"));
