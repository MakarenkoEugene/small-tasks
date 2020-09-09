// PropTypes

// Вы можете отловить много ошибок с помощью проверки типов.

// Для запуска этой проверки на пропсах компонента вам нужно использовать специальное свойство propTypes:

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Greeting extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
};

const propTypes = {
  // Можно объявить проп на соответствие определённому JS-типу.
  // По умолчанию это не обязательно.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Все, что может быть отрендерено:
  // числа, строки, элементы или массивы
  // (или фрагменты) содержащие эти типы
  optionalNode: PropTypes.node,

  // React-элемент
  optionalElement: PropTypes.element,

  // Тип React-элемент (например, MyComponent).
  optionalElementType: PropTypes.elementType,

  // Можно указать, что проп должен быть экземпляром класса
  // Для этого используется оператор `instanceof`.
  optionalGreeting: PropTypes.instanceOf(Greeting),

  // Вы можете задать ограничение конкретными значениями
  // при помощи перечисления
  optionalEnum: PropTypes.oneOf(["News", "Photos"]),

  // Объект, одного из нескольких типов
  optionalUnion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Greeting)]),

  // Массив объектов конкретного типа
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Объект со свойствами конкретного типа
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Объект с определённой структурой
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),

  // Объект со строгой структурой,
  // при наличии необъявленных свойств будут сформированы предупреждения
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number,
  }),

  // Можно добавить`isRequired` к любому приведённому выше типу, чтобы показывать предупреждение, если проп не передан.
  requiredFunc: PropTypes.func.isRequired,

  // Значение любого типа
  requiredAny: PropTypes.any.isRequired,

  // Можно добавить собственный валидатор.
  // Он должен возвращать объект `Error` при ошибке валидации.
  customProp: function (props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(`Проп ${propName} компонента ${componentName} имеет неправильное значение ${props}`);
    }
  },

  // Не используйте `console.warn` или `throw` - это не будет работать внутри `oneOfType`

  // Можно задать свой валидатор для `arrayOf` и `objectOf`.
  // Валидатор будет вызван для каждого элемента в массиве или для каждого свойства объекта.
  // Первые два параметра валидатора - это массив или объект и ключ текущего элемента

  customArrayProp: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(`Проп ${propFullName} компонента ${componentName} имеет неправильное значение`);
    }
  }),
};

// С помощью PropTypes.element вы можете указать, что в качестве дочернего может быть передан только один элемент.
class MyComponent extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
MyComponent.propTypes = {
  children: PropTypes.element.isRequired,
};

// Вы можете задать значения по умолчанию для ваших props с помощью специального свойства defaultProps:

Greeting.defaultProps = {
  name: "Незнакомец",
};

// Определение defaultProps гарантирует, что this.props.name будет иметь значение, даже если оно не было указано родительским компонентом. Сначала применяются значения по умолчанию, заданные в defaultProps. После запускается проверка типов с помощью propTypes. Так что проверка типов распространяется и на значения по умолчанию.

ReactDOM.render(<Greeting name={"Eugene"} />, document.getElementById("root"));
