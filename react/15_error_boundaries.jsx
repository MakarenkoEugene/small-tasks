// error-boundaries

// Ошибка JavaScript где-то в коде UI не должна прерывать работу всего приложения.

// Предохранители — это компоненты React, которые отлавливают ошибки JavaScript в любом месте деревьев их дочерних компонентов, сохраняют их в журнале ошибок и выводят запасной UI вместо рухнувшего дерева компонентов. Предохранители отлавливают ошибки при рендеринге, в методах жизненного цикла и конструкторах деревьев компонентов, расположенных под ними.

// Предохранители не поймают ошибки в:
// обработчиках событий (подробнее);
// асинхронном коде (например колбэках из setTimeout или requestAnimationFrame);
// серверном рендеринге (Server-side rendering);
// самом предохранителе (а не в его дочерних компонентах).

// Классовый компонент является предохранителем, если он включает хотя бы один из методов жизненного цикла:
// static getDerivedStateFromError() или componentDidCatch().

// Используйте static getDerivedStateFromError() при рендеринге запасного UI в случае отлова ошибки. Этот метод жизненного цикла вызывается после возникновения ошибки у компонента-потомка. Он получает ошибку в качестве параметра и возвращает значение для обновления состояния. Вызывается во время этапа «рендера». Поэтому здесь запрещены любые побочные эффекты, но их можно использовать в componentDidCatch()

// Используйте componentDidCatch() при написании кода для журналирования информации об отловленной ошибке.Этот метод жизненного цикла вызывается после возникновения ошибки у компонента-потомка. Он получает два параметра:
// error — перехваченная ошибка
// info — объект с ключом componentStack, содержащий информацию о компоненте, в котором произошла ошибка.
// componentDidCatch() вызывается во время этапа «фиксации», поэтому здесь можно использовать побочные эффекты. Метод можно использовать для логирования ошибок.
// В случае ошибки вы можете рендерить запасной интерфейс с помощью componentDidCatch(), вызвав setState. Однако, этот способ скоро будет считаться устаревшим. Используйте static getDerivedStateFromError() для рендера резервного интерфейса.

import React from "react";
import ReactDOM from "react-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { error: error };
  }

  // componentDidCatch(error, errorInfo) {
  //   // Catch errors in any components below and re-render with error message
  //   this.setState({
  //     error: error,
  //     errorInfo: errorInfo,
  //   });
  //   // You can also log error messages to an error reporting service here
  // }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Something went wrong.</h2>

          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  render() {
    // Simulate a JS error
    if (this.state.counter >= 5) throw new Error("I crashed!");

    return (
      <h1 style={{ cursor: "pointer" }} onClick={() => this.setState({ counter: this.state.counter + 1 })}>
        Countre: {this.state.counter}
      </h1>
    );
  }
}

function App() {
  return (
    <div>
      <p>When the counter reaches 5 it will throw an exception.</p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <p>To enlarge click on the counter.</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// Предохранители работают как JavaScript-блоки catch {}, но только для компонентов. Только классовые компоненты могут выступать в роли предохранителей. На практике чаще всего целесообразным будет один раз описать предохранитель и дальше использовать его по всему приложению.
// Предохранители отлавливают ошибки исключительно в своих дочерних компонентах. Предохранитель не сможет отловить ошибку внутри самого себя.

// Начиная с React 16, ошибки, не отловленные ни одним из предохранителей, будут приводить к размонтированию всего дерева компонентов React

// Предохранители не отлавливают ошибки, произошедшие в обработчиках событий.
// В отличие от метода render и методов жизненного цикла, обработчики событий не выполняются во время рендеринга. Таким образом, даже если они сгенерируют ошибку, React всё равно знает, что нужно выводить на экран.

// Чтобы отловить ошибку в обработчике событий, пользуйтесь обычной JavaScript-конструкцией try / catch
