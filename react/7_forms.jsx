// forms
// В React HTML-элементы формы ведут себя несколько отлично от остальных DOM-элементов, так как у элементов формы изначально есть внутреннее состояние

// В большинстве случаев при работе с формами мы рекомендуем использовать управляемые компоненты.

// В атрибут value можно передать массив, что позволит выбрать несколько опций в теге select:
//  <select multiple={true} value={['Б', 'В']}></select>

// В React <input type="file"> всегда является неуправляемым компонентом, потому что его значение может быть установлено только пользователем, а не программным путём.

import React from "react";
import ReactDOM from "react-dom";

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boolean: true,
      number: 1,
      string: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { checked, value, type, name } = event.target;

    this.setState({
      [name]: type === "checkbox" ? checked : value,
    });
  }

  render() {
    const { boolean, number, string } = this.state;

    return (
      <form>
        <label>
          Boolean:
          <input name="boolean" type="checkbox" checked={boolean} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number:
          <input name="number" type="number" value={number} onChange={this.handleInputChange} />
        </label>

        <br />
        <label>
          String: <input name="string" type="string" value={string} onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

ReactDOM.render(<Reservation />, document.getElementById("root"));

// Если установить управляемому компоненту проп value, то пользователь не сможет изменить его значение без вашего желания.

// Если вы установили value равный undefined или null, поле ввода по-прежнему можно редактировать.

// Вместо того, чтобы писать обработчик события для каждого обновления состояния, вы можете использовать неуправляемый компонент и читать значения из DOM через реф.
// Неуправляемые компоненты опираются на DOM в качестве источника данных и могут быть удобны при интеграции React с кодом, не связанным с React. Количество кода может уменьшиться, правда, за счёт потери в его чистоте. Поэтому в обычных ситуациях мы рекомендуем использовать управляемые компоненты.