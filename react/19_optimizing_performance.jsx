// Optimizing performance

// По умолчанию в React есть много вспомогательных предупреждений, очень полезных при разработке. Тем не менее, они делают React больше и медленнее, вам следует использовать продакшен-версию при деплое приложения.
// Если вы не уверены в том, что процесс сборки настроен правильно, вы можете проверить это, установив React Developer Tools for Chrome.

// Анализ производительности компонентов с помощью вкладки Chrome «Performance»

// Виртуализация длинных списков

// React создаёт и поддерживает внутреннее представление отображаемого пользовательского интерфейса. Это представление позволяет React избегать создания DOM-узлов и не обращаться к текущим без необходимости, поскольку эти операции могут быть медленнее, чем операции с JavaScript-объектами. «виртуальный DOM»

// Несмотря на то, что React обновляет только изменённые DOM-узлы, повторный рендеринг всё же занимает некоторое время. Вы можете всё ускорить, переопределив метод жизненного цикла shouldComponentUpdate, который вызывается перед началом процесса ререндеринга.

// shouldComponentUpdate(nextProps, nextState) {
//    return true;
// }

// Если вы знаете ситуации, в которых ваш компонент не нуждается в обновлении, вы можете вернуть false из shouldComponentUpdate, чтобы пропустить весь процесс рендеринга, включая вызов render() и так далее ниже по иерархии.

// В большинстве случаев вы можете использовать React.PureComponent вместо написания собственного shouldComponentUpdate. Но он делает только поверхностное сравнение, поэтому его нельзя использовать, если пропсы и состояние могут измениться таким образом, который не сможет быть обнаружен при поверхностном сравнении.

import React from "react";
import ReactDOM from "react-dom";

class CounterButton extends React.PureComponent {
  // React.PureComponent похож на React.Component. Отличие заключается в том, что React.Component не реализует shouldComponentUpdate(), а React.PureComponent реализует его поверхностным сравнением пропсов и состояния.
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }
  // Метод shouldComponentUpdate() базового класса React.PureComponent делает только поверхностное сравнение объектов. Если они содержат сложные структуры данных, это может привести к неправильной работе

  render() {
    // Если метод render() рендерит одинаковый результат при одних и тех же пропсах и состояниях, для повышения производительности можна использовать React.PureComponent.
    return (
      <button color={this.props.color} onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>
        Счётчик: {this.state.count}
      </button>
    );
  }
}
// Наследуйте класс PureComponent только тогда, когда вы ожидаете использовать простые пропсы и состояние, или используйте forceUpdate(), когда знаете, что вложенные структуры данных изменились.

// Вызов forceUpdate(callback) приведёт к выполнению метода render() в компоненте, пропуская shouldComponentUpdate() каждого дочернего компонента.

// метод shouldComponentUpdate() базового класса React.PureComponent пропускает обновление пропсов для всего поддерева компонентов. Убедитесь, что все дочерние компоненты также являются «чистыми».

// React.memo — это компонент высшего порядка. Он похож на React.PureComponent, но предназначен для функциональных компонентов.

// React.memo затрагивает только изменения пропсов. Если функциональный компонент обёрнут в React.memo и использует useState или useContext, он будет повторно рендериться при изменении состояния или контекста. Можена передать свою функцию сравнения в качестве второго аргумента.

function MyComponent(props) {
  /* рендер с использованием пропсов */
}
function areEqual(prevProps, nextProps) {
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
}
const MyPureComponent = React.memo(MyComponent, areEqual);
// В отличие от метода shouldComponentUpdate() для классовых компонентов, функция areEqual возвращает true, если пропсы равны, и значение false, если пропсы не равны. Это обратные значения для shouldComponentUpdate.

ReactDOM.render(<CounterButton />, document.getElementById("root"));


// избегать мутирования значений, которые вы используете как свойства или состояние.

// Синтаксис расширения свойств объекта упрощает обновление объектов без мутаций:

// function updateColorMap(colormap) {
//   return {...colormap, right: 'blue'};
// }
