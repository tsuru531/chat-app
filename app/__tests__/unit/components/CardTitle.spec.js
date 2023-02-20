import { shallowMount } from '@vue/test-utils'
import CardTitle from '@/components/atoms/CardTitle'

describe('CardTitle.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(CardTitle, {
      propsData: {
        value: 'value'
      }
    })
  })
  it('props', () => {
    expect(wrapper.props().value).toBe('value')
  })
})