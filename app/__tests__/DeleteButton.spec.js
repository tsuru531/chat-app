import { shallowMount } from '@vue/test-utils'
import DeleteButton from '@/components/atoms/DeleteButton'
import BaseIconButton from '@/components/atoms/BaseIconButton'

describe('DeleteButton.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(DeleteButton, {
      stubs: {
        BaseIconButton
      }
    })
  })
  it('click can be emitted', () => {
    const button = wrapper.findComponent(BaseIconButton)
    button.trigger('click')
    expect(wrapper.emitted().click.length).toBe(1)
  })
})