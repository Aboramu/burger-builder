import React from 'react';
import { configure, shallow } from 'enzyme'; // для настройки enzyme, shallow рендерит компонент с контентом, но контент не рендерится не глубоко
// т.е. не нужно рендерить содержимое компонентов, placeholder
import Adapter from 'enzyme-adapter-react-16'; // для конфигурации enzyme и connect с react
// импортируем компонент который хотим протестировать 
import NavigationItems from './NavigationItems';
// то что будем искать в тестируемом компоненте 
import NavigationItem from './NavigationItem';

configure({adapter: new Adapter()}); // подключаем enzyme

// описываем тест - 1 какой компонент, 2й - функция 
describe('<NavigationItems />', () => {
  // что бы каждый раз не создавать wrapper используем beforeEach, которая будет выполняться
  // перед каждый it 
  let wrapper;
  beforeEach(() => {
    // создаем обертку для тестируемого компонента, его передаем как JSX
    wrapper = wrapper = shallow(<NavigationItems />);
  })
  // 1 что должен делать тест, 2 - функция
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    // метод expect() позволяет взглянуть внутрь компонента, доступен благодаря jest
    // внутри него мы используем wrapper.find(), который доступен благодаря enzyme 
    // ищем компонент, который должен быть внутри, просто имя переменной, не jsx 
    // toHaveLength доступен благодаря jest, автоматически добавляет найденное в arr 
    // и передав в него number мы указываем сколько раз хотим встретить искомый элемент 
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    // используем метод из enzyme, который позволяет изменять prop
    wrapper.setProps({ isAuth: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render <NavigationItem /> with Logout', () => {
    wrapper.setProps({ isAuth: true});
    // .contains позволяет проверить существование 1 специфичного узла
    // этот узел указывается в jsx
    // здесть, проверяем есть NavigationItems узел NavigationItem, который содержит 
    // текстовый узел Logout и props link="/logout"
    // .toEqual показывает чему должно соответствовать утверждение
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});
