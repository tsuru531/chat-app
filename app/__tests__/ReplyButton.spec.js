import { shallowMount } from '@vue/test-utils'
import ReplyButton from '@/components/atoms/ReplyButton'
import BaseIconButton from '@/components/atoms/BaseIconButton'

describe('ReplyButton.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(ReplyButton, {
      stubs: {
        BaseIconButton
      }
    })
  })
  it('Can emit by clicking the button', () => {
    const button = wrapper.findComponent(BaseIconButton)
    button.trigger('click')
    expect(wrapper.emitted().click.length).toBe(1)
  })
})