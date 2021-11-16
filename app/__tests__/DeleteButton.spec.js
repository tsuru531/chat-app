import { shallowMount } from '@vue/test-utils'
import DeleteButton from '@/components/atoms/DeleteButton'

describe('DeleteButton.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(DeleteButton)
  })
  it('button element exists', () => {
    const buttonWrapper = wrapper.find('button[type="button"]')
    expect(buttonWrapper.exists()).toBe(true)
  })
  it('click can be emitted', () => {
    const button = wrapper.find('button[type="button"]')
    button.trigger('click')
    expect(wrapper.emitted().click.length).toBe(1)
  })
})