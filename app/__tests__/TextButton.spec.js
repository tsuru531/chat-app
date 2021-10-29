import { shallowMount } from '@vue/test-utils'
import TextButton from '@/components/atoms/TextButton'

describe('TextButton.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(TextButton, {
      propsData: {
        value: 'value'
      }
    })
  })
  it('props', () => {
    expect(wrapper.props().value).toBe('value')
  })
  it('click', () => {
    const button = wrapper.find('button[type="button"]')
    button.trigger('click')
    expect(wrapper.emitted('click')).not.toBeUndefined();
  })
})