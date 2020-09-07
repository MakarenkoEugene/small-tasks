import React, { Component } from "react";
import ReactDOM from "react-dom";

// Lifting state

// Часто несколько компонентов должны отражать одни и те же изменяющиеся данные. Для этого нужно поднимать общее состояние до ближайшего общего предка.

// Для любых изменяемых данных в React-приложении должен быть один «источник истины».
// Обычно состояние сначала добавляется к компоненту, которому оно требуется для рендера. Затем, если другие компоненты также нуждаются в нём, вы можете поднять его до ближайшего общего предка.
// Если что-то может быть вычислено из пропсов или из состояния, то скорее всего оно не должно находиться в состоянии.

function TemperatureInput({ value, onChangeValue, name }) {
  return (
    <label>
      Enter degrees on scale {name}:{" "}
      <input value={value.toString()} onChange={onChangeValue} type="number" name={name} />
    </label>
  );
}

class Calculator extends Component {
  static toCelsius(fahrenheit) {
    return Math.round(((fahrenheit - 32) * 5) / 9);
  }

  static toFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }

  constructor(props) {
    super(props);
    this.state = {
      celsius: 0,
      fahrenheit: 0,
    };

    this.onChangeTemperature = this.onChangeTemperature.bind(this);
  }

  onChangeTemperature(e) {
    const value = Number(e.target.value);
    const { name } = e.target;

    this.setState({
      celsius: name === "celsius" ? value : Calculator.toCelsius(value),
      fahrenheit: name === "fahrenheit" ? value : Calculator.toFahrenheit(value),
    });
  }

  render() {
    const { celsius, fahrenheit } = this.state;

    return (
      <form>
        <TemperatureInput name="fahrenheit" value={fahrenheit} onChangeValue={this.onChangeTemperature} />
        <br />
        <TemperatureInput name="celsius" value={celsius} onChangeValue={this.onChangeTemperature} />
      </form>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
