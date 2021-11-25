import { shallowMount } from '@vue/test-utils'
import CommentItem from '@/components/organisms/CommentItem'
import DeleteButton from '@/components/atoms/DeleteButton'

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
      stubs: {
        DeleteButton
      },
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
  it('DeleteButton exists', () => {
    const deleteButton = wrapper.findComponent(DeleteButton)
    expect(deleteButton.exists()).toBe(true)
  })
  it('Can emit by clicking the DeleteButton', () => {
    const deleteButton = wrapper.findComponent(DeleteButton)
    deleteButton.trigger('click')
    expect(wrapper.emitted().deleteItem.length).toBe(1)
  })
})