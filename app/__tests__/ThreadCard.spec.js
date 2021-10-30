import { shallowMount } from '@vue/test-utils'
import ThreadCard from '@/components/molecules/ThreadCard'

describe('ThreadCard.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(ThreadCard, {
      propsData: {
        title: 'title'
      }
    })
  })
  it('props', () => {
    expect(wrapper.props().title).toBe('title')
  })
})