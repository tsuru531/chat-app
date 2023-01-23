import { shallowMount } from '@vue/test-utils';
import CommentHeader from '@/components/molecules/CommentHeader';
import ReportButton from '@/components/atoms/ReportButton';

describe('components/CommentHeader', () => {
  const propsData = {
    index: 1,
    handlename: '名無しさん',
    isReported: false,
    isDeleted: false,
  };
  const stubs = {
    ReportButton,
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
    const child = wrapper.findComponent(ReportButton);
    expect(child.exists()).toBe(true);
    expect(child.props().isReported).toBe(false);
  });
  it('isDeleted props is displayed correctly.', async () => {
    const child = wrapper.findComponent(ReportButton);
    expect(child.exists()).toBe(true);
    await wrapper.setProps({ ...propsData, isDeleted: true });
    expect(child.exists()).toBe(false);
  });
  it('report emit by clicking the ReportButton', async () => {
    const button = wrapper.findComponent(ReportButton);
    expect(button.exists()).toBe(true);
    await button.trigger('click');
    expect(wrapper.emitted().report.length).toBe(1);
  })
});
