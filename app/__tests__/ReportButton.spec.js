import { shallowMount } from '@vue/test-utils';
import ReportButton from '@/components/atoms/ReportButton';

describe('ReportButton.vue', () => {
  const propsData = {
    isReported: false,
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ReportButton, { propsData });
  });
  it('Emit by clicking the button', () => {
    const button = wrapper.find('button[type="button"]');
    button.trigger('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
  it('Receive props', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Switch the displayed text by props', async () => {
    const button = wrapper.find('button[type="button"]');
    expect(button.text()).toBe("通報");
    await wrapper.setProps({ ...propsData, isReported: true });
    expect(button.text()).toBe("通報を取り消す");
  });
});
