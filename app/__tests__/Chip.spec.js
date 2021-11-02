import { shallowMount } from '@vue/test-utils'
import Chip from '@/components/atoms/Chip'

describe('Chip.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Chip, {
      propsData: {
        value: 'value'
      }
    })
  })
  it('props', () => {
    expect(wrapper.props().value).toBe('value')
  })
})