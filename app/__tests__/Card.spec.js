import { shallowMount } from '@vue/test-utils'
import Card from '@/components/atoms/Card'

describe('Card.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Card, {
      slots: {
        default: '<div data-test="slotContent">slot content</div>',
      },
    })
  })
  it('Content can be inserted in slots', () => {
    const slotContent = wrapper.find('[data-test="slotContent"]');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('slot content');
  });
})