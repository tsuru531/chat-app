import { shallowMount } from '@vue/test-utils';
import LikeButton from '@/components/molecules/LikeButton';
import BaseIconButton from '@/components/atoms/BaseIconButton';
import Icons from '@/components/atoms/Icons';
import Counter from '@/components/atoms/Counter';

describe('components/LikeButton', () => {
  const propsData = {
    isLike: false,
    count: 0,
  };
  const stubs = {
    BaseIconButton,
    Icons,
    Counter,
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(LikeButton, { propsData, stubs });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Can pass props to Icons component.', () => {
    const child = wrapper.findComponent(Icons);
    expect(child.exists()).toBe(true);
    expect(child.props().type).toBe('like-false');
  });
  it('Can pass props to Counter component.', () => {
    const child = wrapper.findComponent(Counter);
    expect(child.exists()).toBe(true);
    expect(child.props().count).toBe(0);
  });
  it('Emit by clicking the button', async () => {
    const button = wrapper.findComponent(BaseIconButton);
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    expect(wrapper.emitted().click.length).toBe(1);
  })
});
