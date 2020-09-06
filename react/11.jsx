// 2.11 JSX

// JSX — синтаксический сахар для функции

// После компиляции каждое JSX-выражение становится обычным вызовом JavaScript-функции, результат которого — объект JavaScript

// Babel компилирует JSX в вызовы React.createElement().

// По умолчанию React DOM экранирует все значения, включённые в JSX перед тем как отрендерить их.

// Что дает:
// JSX - наглядность при работе с UI, живущем в JavaScript-коде. Помимо этого, JSX помогает React делать сообщения об ошибках и предупреждениях понятнее.


import React from "react";

// Поскольку JSX компилируется в вызов React.createElement, библиотека React должна всегда быть в области видимости вашего JSX-кода.

import ReactDOM from "react-dom";

// Названия типов пользовательских компонентов должны начинаться с большой буквы
const Hello1 = <h2 style={{ color: "white" }}>Hello word!</h2>;
const Hello2 = React.createElement("h2", { style: { color: "white" } }, "Hello word!");

// В качестве типа React-элемента нельзя использовать выражение. Если вы хотите использовать выражение, чтобы указать тип элемента, присвойте его в переменную, начинающуюся с заглавной буквы.

function Leter({ children }) {
  const Teg = `h${children.length > 5 ? 6 : children.length}`;
  return <Teg>{children}</Teg>;
}

// Оператор if и цикл for не являются выражениями в JavaScript, поэтому их нельзя непосредственно использовать в JSX. Вместо этого, вы можете окружить ими JSX-код.

// Если вы не передаёте значение в проп, то по умолчанию оно будет true. Эти два JSX выражения эквивалентны:

// <MyTextBox autocomplete /> === <MyTextBox autocomplete={true} />

// Также React-компонент может возвращать массив элементов:

const ReactArr = [<li key="1">1</li>, <li key="2">2</li>, <li key="3">3</li>];


// Значения false, null, undefined и true — валидные дочерние компоненты. Просто они не рендерятся.

// Функции как дочерние компоненты
// Дочерние компоненты, передаваемые пользовательскому компоненту, могут быть чем угодно с тем условием, что компонент преобразует их во что-то, что React сможет понять и отрендерить.

function Repit({ repitCount = 1, children }) {
  const items = [];

  for (let i = 0; i < repitCount; items.push(children(++i)));

  return items;
}

ReactDOM.render(
  <div>
    {Hello1} {Hello2}
    <hr />
    <Leter>Euge</Leter>
    <hr />
    <ul>{ReactArr}</ul>
    <hr />
    <ul>{null}{true}{false}{undefined}</ul>
    <hr />
    <Repit repitCount={5}>{(i) => <span key={i}>{i}</span>}</Repit>
  </div>,
  document.getElementById("root")
);
