import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ReportButton from '@/components/organisms/ReportButton';
import UnderlineButton from '@/components/atoms/UnderlineButton';

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
  const stubs = {
    UnderlineButton,
  };
  let store;
  let propsData;
  let wrapper;
  beforeEach(() => {
    propsData = {
      reports: [],
      index: 1,
    };
    store = new Vuex.Store({ modules: { user, thread } });
    wrapper = shallowMount(ReportButton, { store, localVue, propsData, stubs });
  });
  it('Receive props', () => {
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
  it('Execute createReport if my uid does not exist in reports when UnderlineButton emit click.', async () => {
    await wrapper.setProps({ ...propsData, reports: [] });
    await wrapper.vm.$nextTick();
    wrapper.findComponent(UnderlineButton).vm.$emit('click');
    expect(comments.actions.createReport).toHaveBeenCalled();
  });
  it('Execute deleteReport if my uid exist in reports when UnderlineButton emit click.', async () => {
    await wrapper.setProps({ ...propsData, reports: ['login user'] });
    await wrapper.vm.$nextTick();
    wrapper.findComponent(UnderlineButton).vm.$emit('click');
    expect(comments.actions.deleteReport).toHaveBeenCalled();
  });
});
