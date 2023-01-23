import { shallowMount } from '@vue/test-utils'
import ModalDialog from '@/components/molecules/ModalDialog'

describe('ModalDialog.vue', () => {
  const slotItems = {
    content: '<p data-slot="content">content</p>',
    footer: '<button type="button" data-slot="footer">footer</button>'
  }
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(ModalDialog, {
      slots: slotItems
    })
  })
  it('Content can be inserted in slots', () => {
    Object.keys(slotItems).forEach(key => {
      expect(wrapper.find(`[data-slot="${key}"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-slot="${key}"]`).text()).toBe(key)
    })
  })
  it('Can emit by clicking the overlay', () => {
    const overlay = wrapper.find('[class="dialog-overlay"]')
    overlay.trigger('click')
    expect(wrapper.emitted().close.length).toBe(1)
  })
})