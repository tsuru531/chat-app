import { shallowMount } from '@vue/test-utils'
import ChipsList from '@/components/molecules/ChipsList'
import Chip from '@/components/atoms/Chip'

describe('ChipsList.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(ChipsList, {
      stubs: {
        Chip
      },
      propsData: {
        values: ['chip1']
      }
    })
  })
  it('props', () => {
    expect(wrapper.props().values[0]).toBe('chip1')
  })
  it('Chip exists', () => {
    const chip = wrapper.findComponent(Chip)
    expect(chip.exists()).toBe(true)
  })
  it('Props can be passed to child components', () => {
    const chips = wrapper.findAllComponents(Chip).wrappers
    expect(chips[0].text()).toBe('chip1')
  })
})