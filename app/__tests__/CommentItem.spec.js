import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CommentItem from '@/components/organisms/CommentItem';
import CommentHeader from '@/components/molecules/CommentHeader';
import CommentBody from '@/components/molecules/CommentBody';
import CommentButtons from '@/components/molecules/CommentButtons';
import { Timestamp } from 'firebase/firestore';
import { convertTimestamp } from '@/modules';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('components/CommentItem', () => {
  const timestamp = Timestamp.fromDate(new Date());
  const createdAt = convertTimestamp(timestamp);
  const user = {
    namespaced: true,
    getters: {
      uid: () => 'login user',
      isAdmin: () => false,
    },
  };
  const comment = {
    uid: 'another user',
    index: 1,
    handlename: '名無しさん',
    body: 'test>>2',
    createdAt: timestamp,
  };
  const propsData = { comment };
  const stubs = {
    CommentHeader,
    CommentBody,
    CommentButtons,
  };
  let store;
  let wrapper;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { user } });
    wrapper = shallowMount(CommentItem, { store, localVue, propsData, stubs });
  });
  it('Can receive props.', () => {
  Object.keys(propsData).forEach(key => {
    expect(wrapper.props()[key]).toBe(propsData[key]);
  });
});
  it('Exists CommentHeader component.', () => {
    const child = wrapper.findComponent(CommentHeader);
    expect(child.exists()).toBe(true);
  });
  it('Can pass props to CommentHeader component.', async () => {
    const child = wrapper.findComponent(CommentHeader);
    expect(child.props().index).toBe(1);
    expect(child.props().handlename).toBe('名無しさん');
    expect(child.props().isReported).toBe(false);
    expect(child.props().isDeleted).toBe(false);
    await wrapper.setProps({ comment: {
      ...comment,
      reports: 'login user',
      deletedAt: timestamp,
    }});
    await wrapper.vm.$nextTick();
    expect(child.props().isReported).toBe(true);
    expect(child.props().isDeleted).toBe(true);
  });
  it('Exists CommentBody component.', () => {
    const child = wrapper.findComponent(CommentBody);
    expect(child.exists()).toBe(true);
  });
  it('Can pass props to CommentBody component.', () => {
    const child = wrapper.findComponent(CommentBody);
    expect(child.props().timestamp).toBe(createdAt);
  });
  it('Exists CommentButtons component.', () => {
    const child = wrapper.findComponent(CommentButtons);
    expect(child.exists()).toBe(true);
  });
  it('Can pass props to CommentButtons component.', () => {
    const child = wrapper.findComponent(CommentButtons);
    expect(child.props().isLike).toBe(false);
    expect(child.props().likesCount).toBe(0);
    expect(child.props().showDelete).toBe(false);
  });
  it('isLike props are correctly passed to CommentButtons component.', async () => {
    const child = wrapper.findComponent(CommentButtons);
    await wrapper.setProps({ comment: { ...comment, likes: ['another user'] } });
    await wrapper.vm.$nextTick();
    expect(child.props().isLike).toBe(false);
    await wrapper.setProps({ comment: { ...comment, likes: ['login user'] } });
    await wrapper.vm.$nextTick();
    expect(child.props().isLike).toBe(true);
  });
  it('likesCount props are correctly passed to CommentButtons component.', async () => {
    const child = wrapper.findComponent(CommentButtons);
    await wrapper.setProps({ comment: { ...comment, likes: ['test'] } });
    await wrapper.vm.$nextTick();
    expect(child.props().likesCount).toBe(1);
    await wrapper.setProps({ comment: { ...comment, likes: ['test', 'test2'] } });
    await wrapper.vm.$nextTick();
    expect(child.props().likesCount).toBe(2);
  });
  it('Pass true in CommentButtons showDelete props when uid matches.', async () => {
    const child = wrapper.findComponent(CommentButtons);
    await wrapper.setProps({ comment: { ...comment, uid: 'login user' } });
    await wrapper.vm.$nextTick();
    expect(child.props().showDelete).toBe(true);
  });
  it('Pass true in CommentButtons showDelete props when is admin.', async () => {
    store = new Vuex.Store({ modules: { user: {
      ...user,
      getters: {
        isAdmin: () => true,
      },
    }}});
    wrapper = shallowMount(CommentItem, { store, localVue, propsData, stubs });
    const child = wrapper.findComponent(CommentButtons);
    expect(child.props().showDelete).toBe(true);
  });
  it('Hide CommentButtns if deletedAt exists.', async () => {
    const child = wrapper.findComponent(CommentButtons);
    await wrapper.setProps({ comment: { ...comment, deletedAt: timestamp } });
    await wrapper.vm.$nextTick();
    expect(child.exists()).toBe(false);
  });
});
