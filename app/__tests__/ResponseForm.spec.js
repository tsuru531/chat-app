import { shallowMount } from '@vue/test-utils'
import ResponseForm from '@/components/molecules/ResponseForm'
import SendIconButton from '@/components/atoms/SendIconButton'

describe('ResponseForm.vue', () => {
  const propsData = {
    response: '',
    handlename: ''
  }
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(ResponseForm, {
      stubs: {
        SendIconButton
      },
      propsData
    })
  })
  it('Receive props', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key])
    })
  })
  it('Emit when changing handlename', async () => {
    const input = wrapper.find('input')
    await input.setValue('handlename')
    expect(wrapper.emitted('change_handlename')).toBeTruthy()
  })
  it('Emit by clicking the SendIconButton', () => {
    const button = wrapper.findComponent(SendIconButton)
    button.vm.$emit('click')
    expect(wrapper.emitted('send')).toBeTruthy()
  })
})