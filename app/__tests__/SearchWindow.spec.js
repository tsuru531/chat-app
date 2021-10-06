import { shallowMount } from '@vue/test-utils'
import SearchWindow from '@/components/molecules/SearchWindow'

describe('SearchWindow.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(SearchWindow, {
      propsData: {
        searchword: 'initial value'
      }
    })
  })
  it('props', () => {
    const input = wrapper.find('input[type="search"]')
    expect(input.element.value).toBe('initial value')
  })
  it('change searchword', () => {
    const input = wrapper.find('input[type="search"]')
    input.setValue('searchword')
    expect(wrapper.emitted().change[0]).toEqual(['searchword'])
  })
  it('click search-button', () => {
    const button = wrapper.find('button[type="button"]')
    button.trigger('click')
    expect(wrapper.emitted().search.length).toBe(1)
  })
})
