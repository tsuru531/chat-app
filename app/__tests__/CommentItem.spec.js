import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CommentItem from '@/components/organisms/CommentItem';
import CommentHeader from '@/components/molecules/CommentHeader';
import CommentBody from '@/components/molecules/CommentBody';
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
      uid: () => 'uid',
    },
  };
  const propsData = {
    comment: {
      index: 1,
      handlename: '名無しさん',
      createdAt,
    },
  };
  const stubs = {
    CommentHeader,
    CommentBody,
  };
  const reports = ['uid'];
  let store;
  let wrapper;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { user } });
    wrapper = shallowMount(CommentItem, { propsData, stubs });
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
    await wrapper.setProps({ comment: { ...comment, reports, deletedAt: timestamp }});
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
});
