import { shallowMount } from '@vue/test-utils';
import CommentHeader from '@/components/organisms/CommentHeader';
import ReportButton from '@/components/molecules/ReportButton';
import CheckReportsButton from '@/components/organisms/CheckReportsButton';

describe('components/CommentHeader', () => {
  const propsData = {
    index: 1,
    handlename: '名無しさん',
    role: 'general',
    isReported: false,
    isDeleted: false,
  };
  const stubs = {
    ReportButton,
    CheckReportsButton,
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CommentHeader, { propsData, stubs });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('index props is displayed correctly.', async () => {
    const index = wrapper.find('span[data-label="index"]');
    expect(index.text()).toBe('1');
    await wrapper.setProps({ ...propsData, index: 2 });
    expect(index.text()).toBe('2');
  });
  it('handlename props is displayed correctly.', async () => {
    const handlename = wrapper.find('span[data-label="handlename"]');
    expect(handlename.text()).toBe('名無しさん');
    await wrapper.setProps({ ...propsData, handlename: 'テストユーザー' });
    expect(handlename.text()).toBe('テストユーザー');
  });
  it('Can pass props to ReportButton component.', () => {
    expect(wrapper.findComponent(ReportButton).props().isReported).toBe(false);
  });
  it('isDeleted props is displayed correctly.', async () => {
    const child = wrapper.findComponent(ReportButton);
    expect(child.exists()).toBe(true);
    await wrapper.setProps({ ...propsData, isDeleted: true });
    expect(child.exists()).toBe(false);
  });
  it('Emit report when ReportButton emit click.', async () => {
    await wrapper.findComponent(ReportButton).vm.$emit('click');
    expect(wrapper.emitted().report.length).toBe(1);
  });
  it('Exists ReportButton when role is not admin.', async () => {
    await wrapper.setProps({ ...propsData, role: 'general' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ReportButton).exists()).toBe(true);
  });
  it('Does not exist ReportButton when role is admin.', async () => {
    await wrapper.setProps({ ...propsData, role: 'admin' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(ReportButton).exists()).toBe(false);
  });
  it('Exists CheckReportsButton when role is admin.', async () => {
    await wrapper.setProps({ ...propsData, role: 'general' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(CheckReportsButton).exists()).toBe(false);
    await wrapper.setProps({ ...propsData, role: 'admin' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(CheckReportsButton).exists()).toBe(true);
  });
});
