import { shallowMount } from '@vue/test-utils';
import SendIconButton from '@/components/molecules/SendIconButton';
import BaseIconButton from '@/components/atoms/BaseIconButton';
import Icons from '@/components/atoms/Icons';

describe('components/SendIconButton', () => {
  let propsData = {
    isActive: false,
  };
  let stubs;
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SendIconButton, { propsData });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Exists BaesIconButton component.', () => {
    stubs = { BaseIconButton };
    wrapper = shallowMount(SendIconButton, { propsData, stubs });
    const button = wrapper.findComponent(BaseIconButton);
    expect(button.exists()).toBe(true);
  });
  it('Exists Icons component.', () => {
    stubs = { Icons };
    wrapper = shallowMount(SendIconButton, { propsData, stubs });
    const icons = wrapper.findComponent(Icons);
    expect(icons.exists()).toBe(true);
  });
  it('Can emit click by emitting click of BaseIconButton component.', () => {
    const button = wrapper.findComponent(BaseIconButton);
    button.vm.$emit('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
  it('Correct props passed to child component when isActive is false.', () => {
    expect(wrapper.findComponent(BaseIconButton).props().isInactive).toBe(true);
    expect(wrapper.findComponent(Icons).props().type).toBe('send-inactive');
  });
  it('Correct props passed to child component when isActive is true.', async () => {
    await wrapper.setProps({ ...propsData, isActive: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(BaseIconButton).props().isInactive).toBe(false);
    expect(wrapper.findComponent(Icons).props().type).toBe('send-active');
  });
});
