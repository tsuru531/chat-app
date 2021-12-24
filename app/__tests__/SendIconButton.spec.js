import { shallowMount } from '@vue/test-utils'
import SendIconButton from '@/components/atoms/SendIconButton'
import BaseIconButton from '@/components/atoms/BaseIconButton'

describe('SendIconButton.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(SendIconButton, {
      stubs: {
        BaseIconButton
      }
    })
  })
  it('Emit by clicking the button', () => {
    const button = wrapper.findComponent(BaseIconButton)
    button.trigger('click')
    expect(wrapper.emitted().click.length).toBe(1)
  })
})