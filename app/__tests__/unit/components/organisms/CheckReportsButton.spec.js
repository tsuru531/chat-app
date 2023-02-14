import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CheckReportsButton from '@/components/organisms/CheckReportsButton';
import UnderlineButton from '@/components/atoms/UnderlineButton';
import Modal from '@/components/atoms/Modal';

const localVue = createLocalVue();
localVue.use(Vuex);
describe('components/CheckReportsButton', () => {
  const propsData = {
    index: 1,
    isReported: false,
  };
  const stubs = {
    UnderlineButton,
    Modal,
  };
  let thread;
  let comments;
  let store;
  let wrapper;
  beforeEach(() => {
    comments = {
      namespaced: true,
      actions: {
        getReports: jest.fn(),
      },
    };
    thread = {
      namespaced: true,
      modules: { comments },
    };
    store = new Vuex.Store({ modules: { thread } });
    wrapper = shallowMount(CheckReportsButton, { store, localVue, propsData, stubs });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Exists UnderlineButton when isReported props is true.', async () => {
    expect(wrapper.findComponent(UnderlineButton).exists()).toBe(false);
    await wrapper.setProps({ ...propsData, isReported: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UnderlineButton).exists()).toBe(true);
  });
  it('Change displayedModal data to true when UnderlineButton emit click.', async () => {
    await wrapper.setProps({ ...propsData, isReported: true });
    await wrapper.vm.$nextTick();
    await wrapper.setData({ displayedModal: false });
    await wrapper.findComponent(UnderlineButton).vm.$emit('click');
    expect(wrapper.vm.displayedModal).toBe(true);
  });
  it('Change displayedModal data to false when Modal emit close.', async () => {
    await wrapper.setData({ displayedModal: true });
    await wrapper.vm.$nextTick();
    await wrapper.findComponent(Modal).vm.$emit('close');
    expect(wrapper.vm.displayedModal).toBe(false);
  });
  it('Exists Modal when displayedModal data is true.', async () => {
    await wrapper.setData({ displayedModal: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Modal).exists()).toBe(true);
  });
  it('Execute getReports when UnderlineButton emit click.', async () => {
    await wrapper.setProps({ ...propsData, isReported: true });
    await wrapper.vm.$nextTick();
    await wrapper.findComponent(UnderlineButton).vm.$emit('click');
    expect(comments.actions.getReports).toHaveBeenCalled();
  });
});
