import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CommentHeader from '@/components/organisms/CommentHeader';
import ReportButton from '@/components/organisms/ReportButton';
import CheckReportsButton from '@/components/organisms/CheckReportsButton';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('components/CommentHeader', () => {
  const user = {
    namespaced: true,
    getters: {
      uid: () => 'login user',
    },
  };
  const propsData = {
    index: 1,
    handlename: '名無しさん',
    role: 'general',
    reports: [],
    isDeleted: false,
  };
  const stubs = {
    ReportButton,
    CheckReportsButton,
  };
  let store;
  let wrapper;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { user } });
    wrapper = shallowMount(CommentHeader, { store, localVue, propsData, stubs });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('index props is displayed correctly.', async () => {
    const index = wrapper.find('span[data-label="index"]');
    expect(index.text()).toBe('1');
    await wrapper.setProps({ ...propsData, index: 2, reports: [] });
    expect(index.text()).toBe('2');
  });
  it('handlename props is displayed correctly.', async () => {
    const handlename = wrapper.find('span[data-label="handlename"]');
    expect(handlename.text()).toBe('名無しさん');
    await wrapper.setProps({ ...propsData, handlename: 'テストユーザー', reports: [] });
    expect(handlename.text()).toBe('テストユーザー');
  });
  it('isDeleted props is displayed correctly.', async () => {
    const child = wrapper.findComponent(ReportButton);
    expect(child.exists()).toBe(true);
    await wrapper.setProps({ ...propsData, isDeleted: true, reports: [] });
    expect(child.exists()).toBe(false);
  });
  it('Exists ReportButton when role is not admin.', async () => {
    await wrapper.setProps({ ...propsData, role: 'general', reports: [] });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ReportButton).exists()).toBe(true);
  });
  it('Does not exist ReportButton when role is admin.', async () => {
    await wrapper.setProps({ ...propsData, role: 'admin', reports: [] });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ReportButton).exists()).toBe(false);
  });
  it('Exists CheckReportsButton when role is admin.', async () => {
    await wrapper.setProps({ ...propsData, role: 'general', reports: [] });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(CheckReportsButton).exists()).toBe(false);
    await wrapper.setProps({ ...propsData, role: 'admin', reports: [] });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(CheckReportsButton).exists()).toBe(true);
  });
});
