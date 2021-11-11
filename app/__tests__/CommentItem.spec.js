import { shallowMount } from '@vue/test-utils'
import CommentItem from '@/components/molecules/CommentItem'

describe('CommentItem.vue', () => {
  const comment = {
    index: 1,
    handlename: 'handlename',
    content: 'content',
    created_at: 'yyyy/mm/dd hh:mm:ss'
  }
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(CommentItem, {
      propsData: { comment }
    })
  })
  it('Props can be passed', () => {
    Object.keys(comment).forEach(key => {
      expect(wrapper.props().comment[key]).toBe(comment[key])
    })
  })
  it('CommentItem is displayed', () => {
    Object.keys(comment).forEach(key => {
      expect(wrapper.html()).toContain(`${comment[key]}`)
    })
  })
})