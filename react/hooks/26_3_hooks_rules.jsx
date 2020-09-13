// Не используйте хуки внутри циклов, условных операторов или вложенных функций.

// Не вызывайте хуки из обычных функций JavaScript

// Следуя этому правилу, можно гарантировать, что вся логика состояния компонента чётко видна из исходного кода.

// Если мы хотим запускать эффект по условию, то можем поместить это условие внутрь хука

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Example() {
  const [count, setCount] = useState(0);

  // React полагается на порядок вызова хуков.
  // пример работает, потому что порядок вызова хуков одинаков при каждом рендере.
  // что случится, если мы поместим вызов хука внутрь условного оператора?
  // if (count % 2)
  // React has detected a change in the order of Hooks called by Example.
  useEffect(() => {
    console.log(count);
  });

  useEffect(() => {
    document.title = `Вы нажали ${count} раз`;
  }, [count]);

  return (
    <div>
      <p>Вы кликнули {count} раз(а)</p>
      <button onClick={() => setCount(count + 1)}>Нажми на меня</button>
    </div>
  );
}

ReactDOM.render(<Example />, document.getElementById("root"));
