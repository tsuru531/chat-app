import { shallowMount } from '@vue/test-utils'
import SearchIconButton from '@/components/atoms/SearchIconButton'
import BaseIconButton from '@/components/atoms/BaseIconButton'

describe('SearchIconButton.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(SearchIconButton, {
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