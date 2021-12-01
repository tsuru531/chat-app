import { shallowMount } from '@vue/test-utils'
import CommentsCounter from '@/components/atoms/CommentsCounter'

describe('CommentsCounter.vue', () => {
  let wrapper
  const props = {
    count: 1
  }
  beforeEach(() => {
    wrapper = shallowMount(CommentsCounter, {
      propsData: props
    })
  })
  it('Can receive props', () => {
    Object.keys(props).forEach(key => {
      expect(wrapper.props()[key]).toBe(props[key])
    })
  })
  it('count props can be bound', () => {
    const counter = wrapper.find('span[class="comments-counter"]')
    expect(counter.text()).toBe('1')
  })
})