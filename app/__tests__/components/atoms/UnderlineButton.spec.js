import { shallowMount } from '@vue/test-utils';
import UnderlineButton from '@/components/atoms/UnderlineButton';

describe('components/UnderlineButton', () => {
  const propsData = {
    label: 'button',
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(UnderlineButton, { propsData });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Exists button element.', () => {
    expect(wrapper.find('button[type="button"]').exists()).toBe(true);
  });
  it('Emit click when button is clicked.', async () => {
    wrapper.find('button[type="button"]').trigger('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
  it('Props[label] and button text are bind.', async () => {
    await wrapper.setProps({ label: 'bind test' });
    expect(wrapper.find('button[type="button"]').text()).toBe('bind test');
  });
});
