import { shallowMount } from '@vue/test-utils';
import MainContainer from '@/components/atoms/MainContainer';

describe('MainContainer.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(MainContainer, {
      slots: {
        default: '<div data-test="slotContent">slot content</div>'
      }
    })
  });
  it('Content can be inserted in slots', () => {
    const slotContent = wrapper.find('[data-test="slotContent"]');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('slot content');
  });
});