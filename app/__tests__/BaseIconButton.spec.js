import { shallowMount } from '@vue/test-utils'
import BaseIconButton from '@/components/atoms/BaseIconButton'

describe('BaseIconButton.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BaseIconButton, {
      slots: {
        default: '<div data-test="slotContent">slot content</div>',
      }
    });
  });
  it('Can emit by clicking the button', () => {
    const button = wrapper.find('button[type="button"]');
    button.trigger('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
  it('Content can be inserted in slot', () => {
    const slotContent = wrapper.find('[data-test="slotContent"]');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('slot content');
  });
});