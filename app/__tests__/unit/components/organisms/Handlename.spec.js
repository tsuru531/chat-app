import { shallowMount } from '@vue/test-utils';
import Handlename from '@/components/organisms/Handlename';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/Button';
import UnderlineButton from '@/components/atoms/UnderlineButton';

describe('components/Handlename', () => {
  const propsData = {
    value: '',
  };
  const stubs = {
    Modal,
    Button,
    UnderlineButton,
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Handlename, { propsData, stubs });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Change modal.isDisplayed to true when UnderlineButton emit click.', async () => {
    await wrapper.setData({ modal: { isDisplayed: false } });
    wrapper.findComponent(UnderlineButton).vm.$emit('click');
    expect(wrapper.vm.modal.isDisplayed).toBe(true);
  });
});
