import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CommentItem from '@/components/organisms/CommentItem';
import CommentHeader from '@/components/organisms/CommentHeader';
import CommentBody from '@/components/molecules/CommentBody';
import CommentButtons from '@/components/molecules/CommentButtons';
import Anchor from '@/components/molecules/Anchor';
import Modal from '@/components/atoms/Modal';
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
      isSignedIn: () => true,
      uid: () => 'login user',
      isAdmin: () => false,
      role: () => 'general',
    },
  };
  const comments = {
    namespaced: true,
    actions: {
      addLike: jest.fn(),
      removeLike: jest.fn(),
    },
    getters: {
      comment: () => {
        return () => {
          return {
            uid: 'another user',
            index: 2,
            handlename: '名無しさん',
            body: '2つ目のコメント',
            createdAt: timestamp,
          };
        };
      },
    },
  };
  const thread = {
    namespaced: true,
    modules: { comments },
  };
  const propsData = {
    comment: {
      uid: 'another user',
      index: 1,
      handlename: '名無しさん',
      body: 'test',
      createdAt: timestamp,
    },
  };
  let stubs;
  let store;
  let wrapper;
  beforeEach(() => {
    stubs = {
      CommentHeader,
      CommentBody,
      CommentButtons,
    };
    store = new Vuex.Store({ modules: { user, thread } });
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
  it('Exists CommentBody component.', () => {
    const child = wrapper.findComponent(CommentBody);
    expect(child.exists()).toBe(true);
  });
  it('Exists CommentButtons component.', () => {
    const child = wrapper.findComponent(CommentButtons);
    expect(child.exists()).toBe(true);
  });
  it('Can pass props to CommentHeader component.', async () => {
    const child = wrapper.findComponent(CommentHeader);
    expect(child.props().index).toBe(1);
    expect(child.props().handlename).toBe('名無しさん');
    expect(child.props().isDeleted).toBe(false);
    await wrapper.setProps({ ... propsData, comment: {
      ...propsData.comment,
      deletedAt: timestamp,
    }});
    await wrapper.vm.$nextTick();
    expect(child.props().isDeleted).toBe(true);
  });
  it('Can pass props to CommentBody component.', () => {
    const child = wrapper.findComponent(CommentBody);
    expect(child.props().timestamp).toBe(createdAt);
  });
  it('Can pass props to CommentButtons component.', () => {
    const child = wrapper.findComponent(CommentButtons);
    expect(child.props().isLike).toBe(false);
    expect(child.props().likesCount).toBe(0);
    expect(child.props().showDelete).toBe(false);
  });
  it('isLike props are correctly passed to CommentButtons component.', async () => {
    const child = wrapper.findComponent(CommentButtons);
    await wrapper.setProps({ ...propsData, comment: { ...propsData.comment, likes: ['another user'] } });
    await wrapper.vm.$nextTick();
    expect(child.props().isLike).toBe(false);
    await wrapper.setProps({ ...propsData, comment: { ...propsData.comment, likes: ['login user'] } });
    await wrapper.vm.$nextTick();
    expect(child.props().isLike).toBe(true);
  });
  it('likesCount props are correctly passed to CommentButtons component.', async () => {
    const child = wrapper.findComponent(CommentButtons);
    await wrapper.setProps({ ...propsData, comment: { ...propsData.comment, likes: ['test'] } });
    await wrapper.vm.$nextTick();
    expect(child.props().likesCount).toBe(1);
    await wrapper.setProps({ ...propsData, comment: { ...propsData.comment, likes: ['test', 'test2'] } });
    await wrapper.vm.$nextTick();
    expect(child.props().likesCount).toBe(2);
  });
  it('Pass true in CommentButtons showDelete props when uid matches.', async () => {
    const child = wrapper.findComponent(CommentButtons);
    await wrapper.setProps({ ...propsData, comment: { ...propsData.comment, uid: 'login user' } });
    await wrapper.vm.$nextTick();
    expect(child.props().showDelete).toBe(true);
  });
  it('Pass true in CommentButtons showDelete props when is admin.', async () => {
    store = new Vuex.Store({ modules: { user: {
      ...user,
      getters: {
        ...user.getters,
        isAdmin: () => true,
      },
    }}});
    wrapper = shallowMount(CommentItem, { store, localVue, propsData, stubs });
    const child = wrapper.findComponent(CommentButtons);
    expect(child.props().showDelete).toBe(true);
  });
  it('Hide CommentButtns if deletedAt exists.', async () => {
    const child = wrapper.findComponent(CommentButtons);
    await wrapper.setProps({ ...propsData, comment: { ...propsData.comment, deletedAt: timestamp } });
    await wrapper.vm.$nextTick();
    expect(child.exists()).toBe(false);
  });
  it('Emit reply when CommentButtons emit reply.', () => {
    const child = wrapper.findComponent(CommentButtons);
    child.vm.$emit('reply');
    expect(wrapper.emitted().reply.length).toBe(1);
  });
  it('Execute addLike if isLike is false when CommentButtons emit like.', async () => {
    await wrapper.setProps({ ...propsData, comment: { ...propsData.comment, likes: [] } });
    await wrapper.vm.$nextTick();
    const child = wrapper.findComponent(CommentButtons);
    child.vm.$emit('like');
    expect(comments.actions.addLike).toHaveBeenCalled();
  });
  it('Execute removeLike if isLike is true when CommentButtons emit like.', async () => {
    await wrapper.setProps({ ...propsData, comment: { ...propsData.comment, likes: ['login user'] } });
    await wrapper.vm.$nextTick();
    const child = wrapper.findComponent(CommentButtons);
    child.vm.$emit('like');
    expect(comments.actions.removeLike).toHaveBeenCalled();
  });
  it('Emit deleteItem when CommentButtons emit delete.', () => {
    const child = wrapper.findComponent(CommentButtons);
    child.vm.$emit('delete');
    expect(wrapper.emitted().deleteItem.length).toBe(1);
  });
  it('CommentBody does not contain Anchor.', () => {
    const anchor = wrapper.findComponent(CommentBody).findComponent(Anchor);
    expect(anchor.exists()).toBe(false);
  });
  it('Anchor exists in CommentBody when comment.body contains anchor text.', async () => {
    await wrapper.setProps({ ...propsData, comment: { ...propsData.comment, body: 'test>>2' } });
    await wrapper.vm.$nextTick();
    const anchor = wrapper.findComponent(CommentBody).findComponent(Anchor);
    expect(anchor.exists()).toBe(true);
  });
  it('Pass props correcty to Anchor component.', async () => {
    await wrapper.setProps({ ...propsData, comment: { ...propsData.comment, body: 'test>>2' } });
    await wrapper.vm.$nextTick();
    const anchor = wrapper.findComponent(CommentBody).findComponent(Anchor);
    expect(anchor.props().index).toBe(2);
    expect(anchor.props().text).toBe('2つ目のコメント');
  });
  it('Modal does not exist.', () => {
    const component = wrapper.findComponent(Modal);
    expect(component.exists()).toBe(false);
  });
  it('Exists Modal when displayedLoginModal is true.', async () => {
    await wrapper.setData({ displayedLoginModal: true });
    await wrapper.vm.$nextTick();
    const component = wrapper.findComponent(Modal);
    expect(component.exists()).toBe(true);
  });
  it('displayedLoginModal is true when like emit while not logged in.', () => {
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          getters: {
            ...user.getters,
            isSignedIn: () => false,
            uid: () => 'login user',
            isAdmin: () => false,
          },
        }
      }
    });
    wrapper = shallowMount(CommentItem, { store, localVue, propsData, stubs });
    const buttons = wrapper.findComponent(CommentButtons);
    buttons.vm.$emit('like');
    expect(wrapper.vm.displayedLoginModal).toBe(true);
  });
});
