import { shallowMount } from '@vue/test-utils';
import AccountIconButton from '@/components/atoms/AccountIconButton';
import BaseIconButton from '@/components/atoms/BaseIconButton';

describe('AccountIconButton.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(AccountIconButton, {
      stubs: {
        BaseIconButton,
      },
    });
  });
  it('Emit by clicking the button', () => {
    const button = wrapper.findComponent(BaseIconButton);
    button.trigger('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
});
