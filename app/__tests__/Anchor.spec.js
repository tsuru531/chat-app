import { shallowMount } from '@vue/test-utils'
import Anchor from '@/components/atoms/Anchor'

describe('Anchor.vue', () => {
  const propsData = {
    index: 1
  }
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Anchor, { propsData })
  })
  it('Can receive props', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key])
    })
  })
  it('index props can be bound', () => {
    const span = wrapper.find('span')
    expect(span.text()).toBe('>>1')
  })
})