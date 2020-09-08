// Higher order components

// Компонент высшего порядка (Higher-Order Component, HOC) — это один из продвинутых способов для повторного использования логики.

// Это функция, которая принимает компонент и возвращает новый компонент.
// const EnhancedComponent = higherOrderComponent(WrappedComponent);

// Традиционные компоненты подразумевают многократное использование, но не позволяют с лёгкостью решить некоторые проблемы.

import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

// Эта функция принимает компонент...
function withLifeCircleLogger(WrappedComponent) {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      console.log("constructor");
    }

    static getDerivedStateFromProps(props, state) {
      console.log("getDerivedStateFromProps");
      return props;
    }

    shouldComponentUpdate(nextProps, nextState) {
      console.log("shouldComponentUpdate");
      return true;
    }

    render() {
      console.log("render");
      return <WrappedComponent ref={this.props.forwardedRef} {...this.props} />;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
      console.log("getSnapshotBeforeUpdate");
      return null;
    }

    componentDidMount() {
      console.log("componentDidMount");
    }

    componentDidUpdate() {
      console.log("componentDidUpdate");
      console.log("");
    }

    componentWillUnmount() {
      console.log("componentWillUnmount");
      console.log("");
    }
  }

  // Передача Рефов
  return React.forwardRef((props, ref) => {
    return <HOC {...props} forwardedRef={ref} />;
  });
}

function MassageList(props) {
  console.log("MassageList -> props", props);
  return props.massages.map((massage, i) => (
    <Fragment key={massage + i}>
      <small>Index: {i + 1}</small>
      <p>{massage}</p>
      <hr />
    </Fragment>
  ));
}

const MassageListWithLogger = withLifeCircleLogger(MassageList);

function Form(props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.addMassage();
      }}
    >
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault();
          props.setValue(e.target.value);
        }}
        value={props.value}
        id="massage"
        placeholder="massage"
      />
      <input type="submit" value="App Massage" />
    </form>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      massages: [],
      inputValue: "",
    };

    this.addMassage = this.addMassage.bind(this);
    this.setInputValue = this.setInputValue.bind(this);
  }

  addMassage() {
    this.setState({
      massages: [...this.state.massages, this.state.inputValue],
      inputValue: "",
    });
  }

  setInputValue(value) {
    this.setState({ inputValue: value });
  }

  render() {
    return (
      <div>
        <h1>Have massage: {this.state.massages.lenght} </h1>
        <Form value={this.state.inputValue} setValue={this.setInputValue} addMassage={this.addMassage} />

        <MassageListWithLogger massages={this.state.massages} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// Соглашение:

// HOC добавляют компонентам функциональность, но они не должны менять их оригинальное предназначение. Пропсы, которые напрямую не связаны с функциональностью HOC, должны передаваться без изменений оборачиваемому компоненту.

//  Для более лёгкой отладки задать имя, которое подскажет, что определённый компонент был создан с помощью HOC. Самый распространённый способ — это обернуть имя оборачиваемого компонента:
// withLifeCircleLogger.displayName = `withLifeCircleLogger(${WrappedComponent.displayName || WrappedComponent.name})`;

// Не используйте HOC внутри рендер-метода
// Важно учитывать что мы не можем применять компоненты высшего порядка внутри рендер-метода компонента: Проблема не только в производительности. Повторное монтирование компонента обнуляет его состояние, а также состояние его дочерних компонентов.
// Не применяйте HOC в определении другого компонента. Сначала нужно отдельно получить компонент из HOC, и только потом использовать его.
// При необходимости (в редких случаях) можно динамически применять HOC в методах жизненного цикла или конструкторе компонента.

// Копируйте статические методы
// Когда мы применяем HOC, то заворачиваем оригинальный компонент в контейнер. Поэтому у нового компонента не будет статических методов оригинального компонента.
// Скопируйте недостающие методы в контейнер:
// - Вы должны точно знать какие методы копировать
// - Вы можете воспользоваться hoist-non-react-statics, чтобы автоматически скопировать
// - экспортировать статические методы отдельно от компонента
