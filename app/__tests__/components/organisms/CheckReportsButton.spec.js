import { shallowMount } from '@vue/test-utils';
import CheckReportsButton from '@/components/organisms/CheckReportsButton';
import UnderlineButton from '@/components/atoms/UnderlineButton';
import Modal from '@/components/atoms/Modal';

describe('components/CheckReportsButton', () => {
  const propsData = {
    reports: [],
  };
  const stubs = {
    UnderlineButton,
    Modal,
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CheckReportsButton, { propsData, stubs });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Exists UnderlineButton when reports props is not empty.', async () => {
    expect(wrapper.findComponent(UnderlineButton).exists()).toBe(false);
    await wrapper.setProps({ ...propsData, reports: ['uid'] });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UnderlineButton).exists()).toBe(true);
  });
  it('Change displayedModal data to true when UnderlineButton emit click.', async () => {
    await wrapper.setProps({ ...propsData, reports: ['uid'] });
    await wrapper.vm.$nextTick();
    await wrapper.setData({ displayedModal: false });
    await wrapper.findComponent(UnderlineButton).vm.$emit('click');
    expect(wrapper.vm.displayedModal).toBe(true);
  });
  it('Change displayedModal data to false when Modal emit close.', async () => {
    await wrapper.setData({ displayedModal: true });
    await wrapper.vm.$nextTick();
    await wrapper.findComponent(Modal).vm.$emit('close');
    expect(wrapper.vm.displayedModal).toBe(false);
  });
  it('Exists Modal when displayedModal data is true.', async () => {
    await wrapper.setData({ displayedModal: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Modal).exists()).toBe(true);
  });
});
