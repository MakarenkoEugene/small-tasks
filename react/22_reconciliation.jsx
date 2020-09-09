// reconciliation ( Согласование )

// При работе с React вы можете понимать render() как функцию, которая создаёт дерево React-элементов в какой-то момент времени.
// При последующем обновлении состояния или пропсов функция render() вернёт новое дерево React-элементов. Теперь React должен понять, как эффективно обновить UI, чтобы он совпадал с новейшим из деревьев.

// Эвристический алгоритм — алгоритм решения задачи, включающий практический метод, не являющийся гарантированно точным или оптимальным, но достаточный для решения поставленной задачи.
// Взамен, React реализует эвристический алгоритм O(n), который основывается на двух предположениях:

// 1. Два элемента с разными типами произведут разные деревья.
// 2. Разработчик может указать, какие дочерние элементы могут оставаться стабильными между разными рендерами с помощью пропа key.

// - При сравнении двух деревьев первым делом React сравнивает два корневых элемента.

// Всякий раз, когда корневые элементы имеют различные типы, React уничтожает старое дерево и строит новое с нуля. Переходы от <section> к <div>, приведут к полному перестроению.

// При уничтожении дерева старые DOM-узлы удаляются. Экземпляры компонента получают componentWillUnmount(). При построении нового дерева, новые DOM-узлы вставляются в DOM. Экземпляры компонента получают componentWillMount(), а затем componentDidMount(). Любое состояние, связанное со старым деревом, теряется.
// Любые компоненты, лежащие ниже корневого, также размонтируются, а их состояние уничтожится.

// DOM-элементы одного типа
// При сравнении двух React DOM-элементов одного типа, React смотрит на атрибуты обоих, сохраняет лежащий в основе этих элементов DOM-узел и обновляет только изменённые атрибуты.

// После обработки DOM-узла React рекурсивно проходится по дочерним элементам.

// Компоненты одного типа
// React обновляет пропсы базового экземпляра компонента для соответствия новому элементу и вызывает componentWillReceiveProps() и componentWillUpdate() на базовом экземпляре.
// Далее вызывается метод render() и алгоритм сравнения рекурсивно обходит предыдущий и новый результаты.

// Рекурсия по дочерним элементам
// По умолчанию при рекурсивном обходе дочерних элементов DOM-узла React проходит по обоим спискам потомков одновременно и создаёт мутацию, когда находит отличие.
// Когда у дочерних элементов есть ключи, React использует их, чтобы сопоставить потомков исходного дерева с потомками последующего дерева.

// Алгоритм не будет пытаться сопоставить поддеревья компонентов разных типов. Если вы заметите за собой, что пытаетесь чередовать компоненты разных типов с очень схожим выводом, то желательно сделать их компонентами одного типа. На практике мы не выявили с этим проблем.

// Ключи должны быть стабильными, предсказуемыми и уникальными. Нестабильные ключи (например, произведённые с помощью Math.random()) вызовут необязательное пересоздание многих экземпляров компонента и DOM-узлов, что может вызывать ухудшение производительности и потерю состояния у дочерних компонентов.


