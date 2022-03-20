import { shallowMount } from '@vue/test-utils'
import FilterIconButton from '@/components/atoms/FilterIconButton'
import BaseIconButton from '@/components/atoms/BaseIconButton'

describe('FilterIconButton.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(FilterIconButton, {
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