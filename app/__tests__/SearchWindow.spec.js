import { shallowMount } from '@vue/test-utils'
import SearchWindow from '@/components/molecules/SearchWindow'
import SearchIconButton from '@/components/atoms/SearchIconButton';


describe('SearchWindow.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(SearchWindow, {
      propsData: {
        searchword: 'initial value'
      },
      stubs: {
        SearchIconButton,
      },
    });
  });
  it('props', () => {
    const input = wrapper.find('input[type="search"]')
    expect(input.element.value).toBe('initial value')
  })
  it('change searchword', () => {
    const input = wrapper.find('input[type="search"]')
    input.setValue('searchword')
    expect(wrapper.emitted().change[0]).toEqual(['searchword'])
  })
  it('keyup enter', async () => {
    const input = wrapper.find('input[type="search"]');
    await input.trigger('keyup.enter');
    expect(wrapper.emitted('search')).toBeTruthy();
  });
  it('click search-button', async () => {
    const button = wrapper.findComponent(SearchIconButton);
    await button.vm.$emit('click');
    expect(wrapper.emitted('search')).toBeTruthy();
  });
})
