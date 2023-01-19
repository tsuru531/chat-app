import { shallowMount } from '@vue/test-utils'
import Button from '@/components/atoms/Button'

describe('Button.vue', () => {
  const propsData = {
    label: 'button'
  }
  const colorClass = {
    primary: 'cp',
    danger: 'cd',
    green: 'cg',
  }
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Button, { propsData })
  })
  it('button element exists', () => {
    const button = wrapper.find('button[type="button"]')
    expect(button.exists()).toBe(true)
  })
  it('Can receive props', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key])
    })
  })
  it('label props can be bound', () => {
    const button = wrapper.find('button[type="button"]')
    expect(button.text()).toBe(propsData.label)
  })
  it('Can emit by clicking the button', () => {
    const button = wrapper.find('button[type="button"]')
    button.trigger('click')
    expect(wrapper.emitted().click.length).toBe(1)
  })
  it('Can switch classes by changing the color props', async () => {
    const button = wrapper.find('button[type="button"]')
    expect(button.classes()).toStrictEqual([])
    for (let key of Object.keys(colorClass)) {
      await wrapper.setProps({ ...propsData, color: key })
      expect(button.classes()).toStrictEqual([colorClass[key]])
    }
  })
})
