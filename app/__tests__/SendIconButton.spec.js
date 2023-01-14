import { shallowMount } from '@vue/test-utils';
import SendIconButton from '@/components/molecules/SendIconButton';
import BaseIconButton from '@/components/atoms/BaseIconButton';
import Icons from '@/components/atoms/Icons';

describe('components/SendIconButton', () => {
  let stubs;
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SendIconButton);
  });
  it('Exists BaesIconButton component.', () => {
    stubs = { BaseIconButton };
    wrapper = shallowMount(SendIconButton, { stubs });
    const button = wrapper.findComponent(BaseIconButton);
    expect(button.exists()).toBe(true);
  });
  it('Exists Icons component.', () => {
    stubs = { Icons };
    wrapper = shallowMount(SendIconButton, { stubs });
    const icons = wrapper.findComponent(Icons);
    expect(icons.exists()).toBe(true);
  });
  it('Can emit click by emitting click of BaseIconButton component.', () => {
    const button = wrapper.findComponent(BaseIconButton);
    button.vm.$emit('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
});
