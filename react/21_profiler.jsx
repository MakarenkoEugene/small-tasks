// Profiler

// Profiler измеряет то, как часто рендерится React-приложение и какова «стоимость» этого. Его задача — помочь найти медленные части приложения, которые можно оптимизировать (например, через мемоизацию).

// Профилирование добавляет накладные расходы, поэтому оно отключено в продакшен-режиме. Для отладки на продакшене, React предоставляет специальную продакшен-сборку с включенным профилированием.

//  <Profiler id="Navigation" onRender={callback}>
//   <Navigation {...props} />
// </Profiler>

// Profiler может быть добавлен в любую часть React-дерева для измерения стоимости рендеринга этой части. Он принимает два пропа: id (string) и колбэк onRender (function), который React вызывает каждый раз, когда компонент внутри дерева «фиксирует» обновление.

// onRender функция принимает параметры, что было отрендерено и сколько времени это заняло.

function onRenderCallback(
  id, // проп "id" из дерева компонента Profiler, для которого было зафиксировано изменение
  phase, // либо "mount" (если дерево было смонтировано), либо "update" (если дерево было повторно отрендерено)
  actualDuration, // время, затраченное на рендер зафиксированного обновления
  baseDuration, // предполагаемое время рендера всего поддерева без кеширования
  startTime, // когда React начал рендерить это обновление
  commitTime, // когда React зафиксировал это обновление
  interactions // Множество «взаимодействий» для данного обновления
) {
  // Обработка или логирование результатов...
  console.log(arguments);
}

// Для замера разных частей приложения могут быть использованы несколько компонентов Profiler. Также Profiler может быть вложенным с целью замера разных компонентов внутри поддерева.

// Несмотря на то, что компонент Profiler достаточно легковесный, его следует использовать только при необходимости; каждое его использование увеличивает нагрузку на CPU и память.

import React, { Profiler } from "react";
import ReactDOM from "react-dom";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.setState({ date: new Date() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>;
  }
}

function App(props) {
  return <Profiler id="Clock" onRender={onRenderCallback}><Clock /></Profiler>
}

ReactDOM.render(<App />, document.getElementById("root"));
