// Conditional rendering

// Условный рендеринг в React работает так же, как условные выражения работают в JavaScript.

import React, { useState } from "react";
import ReactDOM from "react-dom";

function A() {
  const [checked, setChecked] = useState(false);

  function onChange(e) {
    setChecked(e.target.checked);
  }

  return (
    <div>
      {(checked && <h1>Tick is worth</h1>) || <h1>No tick</h1>}
      {checked ? <h1>Tick is worth</h1> : <h1>No tick</h1>}
      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
}

ReactDOM.render(<A />, document.getElementById("root"));

// В редких случаях может потребоваться позволить компоненту спрятать себя, хотя он уже и отрендерен другим компонентом. Чтобы этого добиться, верните null вместо того, что обычно возвращается на рендеринг.

// Сам факт возврата null из метода render компонента никак не влияет на срабатывание методов жизненного цикла компонента. Например, componentDidUpdate будет всё равно вызван.
