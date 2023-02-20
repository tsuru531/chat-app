import { shallowMount } from '@vue/test-utils';
import Wrapper from '@/components/atoms/Wrapper';

describe('components/Wrapper', () => {
  const slots = {
    default: '<div data-test="slotContent">slot content</div>',
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Wrapper, { slots });
  });
  it('Contents can be inserted into slot.', () => {
    const element = wrapper.find('[data-test="slotContent"]');
    expect(element.exists()).toBe(true);
    expect(element.text()).toBe('slot content');
  });
});
