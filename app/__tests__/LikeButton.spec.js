import { shallowMount } from '@vue/test-utils'
import LikeButton from '@/components/atoms/LikeButton'
import BaseIconButton from '@/components/atoms/BaseIconButton'

describe('LikeButton.vue', () => {
  const propsData = {
    isLike: false
  }
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(LikeButton, {
      stubs: {
        BaseIconButton
      },
      propsData
    })
  })
  it('Receive props', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key])
    })
  })
  it('Emit by clicking the button', () => {
    const button = wrapper.findComponent(BaseIconButton)
    button.trigger('click')
    expect(wrapper.emitted().click.length).toBe(1)
  })
  it('Switch the displayed content by isLike props', async () => {
    const svg = wrapper.findAll('svg')
    expect(svg.length).toBe(1)
    expect(svg.wrappers[0].attributes()['data-is-like']).toBe("false")
    await wrapper.setProps({ ...propsData, isLike: true })
    expect(svg.length).toBe(1)
    expect(svg.wrappers[0].attributes()['data-is-like']).toBe("true")
  })
})