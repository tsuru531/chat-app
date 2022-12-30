import { shallowMount } from '@vue/test-utils';
import CommentButtons from '@/components/molecules/CommentButtons';
import ReplyButton from '@/components/atoms/ReplyButton';
import LikeButton from '@/components/molecules/LikeButton';
import DeleteButton from '@/components/atoms/DeleteButton';

describe('components/CommentButtons', () => {
  const propsData = {
    isLike: false,
    likesCount: 0,
    showDelete: true,
  };
  const stubs = {
    ReplyButton,
    LikeButton,
    DeleteButton,
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CommentButtons, { propsData, stubs });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Exists ReplyButton.', () => {
    const child = wrapper.findComponent(ReplyButton);
    expect(child.exists()).toBe(true);
  });
  it('Exists LikeButton.', () => {
    const child = wrapper.findComponent(LikeButton);
    expect(child.exists()).toBe(true);
  });
  it('Can pass props to LikeButton.', () => {
    const child = wrapper.findComponent(LikeButton);
    expect(child.props().isLike).toBe(false);
    expect(child.props().count).toBe(0);
  });
  it('showDelete props is displayed correctly.', async () => {
    const child = wrapper.findComponent(DeleteButton);
    expect(child.exists()).toBe(true);
    await wrapper.setProps({ ...propsData, showDelete: false });
    await wrapper.vm.$nextTick();
    expect(child.exists()).toBe(false);
  });
  it('Can emit reply by emitting click of ReplyButton.', async () => {
    const child = wrapper.findComponent(ReplyButton);
    child.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().reply.length).toBe(1);
  });
  it('Can emit like by emitting click of LikeButton.', async () => {
    const child = wrapper.findComponent(LikeButton);
    child.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().like.length).toBe(1);
  });
  it('Can emit delete by emitting click of DeleteButton.', async () => {
    const child = wrapper.findComponent(DeleteButton);
    child.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().delete.length).toBe(1);
  });
});
