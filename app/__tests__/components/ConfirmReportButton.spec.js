import { shallowMount } from '@vue/test-utils';
import ConfirmReportButton from '@/components/molecules/ConfirmReportButton';

describe('components/ConfirmReportButton', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ConfirmReportButton);
  });
  it('There is one button.', () => {
    const buttons = wrapper.findAll('button[type="button"]')
    expect(buttons.length).toBe(1);
  });
  it('Emit by clicking the button', async () => {
    await wrapper.find('button[type="button"]').trigger('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
});
