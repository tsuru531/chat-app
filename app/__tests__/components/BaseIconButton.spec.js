import { shallowMount } from '@vue/test-utils'
import BaseIconButton from '@/components/atoms/BaseIconButton'

describe('BaseIconButton.vue', () => {
  let propsData = {
    isInactive: false,
  };
  let slots = {
    default: '<div data-test="slotContent">slot content</div>',
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BaseIconButton, { propsData, slots });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Can switch classes by changing the props', async () => {
    const button = wrapper.find('button[type="button"]');
    await wrapper.setProps({ ...propsData, isInactive: false });
    expect(button.classes()).toStrictEqual(['active']);
    await wrapper.setProps({ ...propsData, isInactive: true });
    expect(button.classes()).toStrictEqual(['inactive']);
  })
  it('Can emit by clicking the button', () => {
    const button = wrapper.find('button[type="button"]');
    button.trigger('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
  it('Content can be inserted in slot', () => {
    const slotContent = wrapper.find('[data-test="slotContent"]');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('slot content');
  });
});