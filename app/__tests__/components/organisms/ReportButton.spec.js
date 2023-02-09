import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ReportButton from '@/components/organisms/ReportButton';
import UnderlineButton from '@/components/atoms/UnderlineButton';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/Button';
import ResizeTextarea from '@/components/atoms/ResizeTextarea';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ReportButton.vue', () => {
  const user = {
    namespaced: true,
    getters: {
      uid: () => 'login user',
    },
  };
  const comments = {
    namespaced: true,
    actions: {
      createReport: jest.fn(),
      deleteReport: jest.fn(),
    },
  };
  const thread = {
    namespaced: true,
    modules: { comments },
  };
  const propsData = {
    reports: [],
    index: 1,
  };
  const stubs = {
    UnderlineButton,
    Modal,
    Button,
    ResizeTextarea,
  };
  let store;
  let wrapper;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { user, thread } });
    wrapper = shallowMount(ReportButton, { store, localVue, propsData, stubs });
  });
  it('Receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Exists UnderlineButton component.', () => {
    expect(wrapper.findComponent(UnderlineButton).exists()).toBe(true);
  });
  it('Switch the displayed text by props', async () => {
    const button = wrapper.find('button[type="button"]');
    expect(button.text()).toBe("通報");
    await wrapper.setProps({ ...propsData, reports: ['login user'] });
    expect(button.text()).toBe("通報を取り消す");
  });
  it('Execute createReport if my uid does not exist in reports when send ref emit click.', async () => {
    await wrapper.setData({ modal: { isDisplayed: true } });
    await wrapper.vm.$nextTick();
    wrapper.findComponent({ ref: 'send' }).vm.$emit('click');
    expect(comments.actions.createReport).toHaveBeenCalled();
  });
  it('Execute deleteReport if my uid exist in reports when cancel ref emit click.', async () => {
    await wrapper.setProps({ ...propsData, reports: ['login user'] });
    await wrapper.vm.$nextTick();
    wrapper.findComponent({ ref: 'cancel' }).vm.$emit('click');
    expect(comments.actions.deleteReport).toHaveBeenCalled();
  });
  it('Change modal.isDisplayed data to true when open ref emit click.', () => {
    wrapper.findComponent({ ref: 'open' }).vm.$emit('click');
    expect(wrapper.vm.modal.isDisplayed).toBe(true);
  });
  it('Exists Modal when modal.isDisplayed is true.', async () => {
    await wrapper.setData({ modal: { isDisplayed: true } });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Modal).exists()).toBe(true);
  });
  it('Exists Button when modal.isDisplayed is true.', async () => {
    await wrapper.setData({ modal: { isDisplayed: true } });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Button).exists()).toBe(true);
  });
  it('Exists cancel ref when reports contains uid of login user.', async () => {
    await wrapper.setProps({ ...propsData, reports: ['login user'] });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ ref: 'cancel' }).exists()).toBe(true);
  });
  it('Exists open ref when reports does not contain uid of login user.', async () => {
    expect(wrapper.findComponent({ ref: 'open' }).exists()).toBe(true);
  });
  it('modal_textarea and modal.body data are bound by v-model.', async () => {
    await wrapper.setData({ modal: { isDisplayed: true } });
    await wrapper.vm.$nextTick();
    wrapper.findComponent({ ref: "modal_textarea" }).vm.$emit('input', 'payload');
    expect(wrapper.vm.modal.body).toBe('payload');
  });
});
