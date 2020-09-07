// Composition versus inheritance

// React имеет мощную модель композиции, поэтому для повторного использования кода между компонентами рекомендуется использовать композицию вместо наследования.

// Некоторые компоненты не знают своих потомков заранее. Он представляют из себя как бы «коробку», в которую можно что-то положить.

// Для таких компонентов мы рекомендуем использовать специальный проп children, который передаст дочерние элементы сразу на вывод:

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

// Всё, что находится внутри JSX-тега <FancyBorder>, передаётся в компонент FancyBorder через проп children.

// Некоторые компоненты можно рассматривать как «частные случаи» других компонентов.

// Пропсы и композиция дают вам всю гибкость, необходимую для настройки внешнего вида и поведения компонента явным и безопасным способом. Помните, что компоненты могут принимать произвольные пропсы, включая примитивные значения, React-элементы или функции.

// Если вы хотите повторно использовать не связанную с внешним видом функциональность между компонентами, извлеките её в отдельный JavaScript-модуль. Импортируйте его в компонент и используйте эту функцию, объект или класс, не расширяя их.