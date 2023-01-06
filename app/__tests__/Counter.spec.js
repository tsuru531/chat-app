import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/atoms/Counter';

describe('components/Counter', () => {
  const propsData = {
    count: 0,
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Counter, { propsData });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Props are rendered correctly.', async () => {
    const counter = wrapper.find('span');
    expect(counter.text()).toBe('0');
    await wrapper.setProps({ count: 1 });
    expect(counter.text()).toBe('1');
  });
});
