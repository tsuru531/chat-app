import { shallowMount } from '@vue/test-utils';
import ResponseForm from '@/components/molecules/ResponseForm';
import InputHandlename from '@/components/molecules/InputHandlename';
import SendIconButton from '@/components/molecules/SendIconButton';

describe('components/ResponseForm', () => {
  let propsData;
  let stubs;
  let wrapper;
  beforeEach(() => {
    propsData = {
      response: '',
      handlename: 'handlename'
    };
    stubs = {
      InputHandlename,
      SendIconButton,
    };
    wrapper = shallowMount(ResponseForm, { propsData, stubs });
  });
  it('Receive props', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Exists InputHandlename component.', () => {
    const child = wrapper.findComponent(InputHandlename);
    expect(child.exists()).toBe(true);
  });
  it('Can pass props to InputHandlename component.', () => {
    const child = wrapper.findComponent(InputHandlename);
    expect(child.props().value).toBe(propsData.handlename);
  });
  it('Can emit change_handlename by emitting input of InputHandlename component.', () => {
    const arg = 'test';
    const child = wrapper.findComponent(InputHandlename);
    child.vm.$emit('input', arg);
    expect(wrapper.emitted().change_handlename.length).toBe(1);
    expect(wrapper.emitted().change_handlename[0]).toEqual([arg]);
  });
  it('Emit by clicking the SendIconButton', () => {
    const button = wrapper.findComponent(SendIconButton);
    button.vm.$emit('click');
    expect(wrapper.emitted().send.length).toBe(1);
  });
  it('isNonemptyForm is false when response is empty.', async () => {
    await wrapper.setProps({ ...propsData, response: '' });
    expect(wrapper.vm.isNonemptyForm).toBe(false);
  });
  it('isNonemptyForm is true when response is nonempty.', async () => {
    await wrapper.setProps({ ...propsData, response: 'value' });
    expect(wrapper.vm.isNonemptyForm).toBe(true);
  });
  it('Passing false to the SendIconButton isActive props when response is empty.', async () => {
    await wrapper.setProps({ ...propsData, response: '' });
    expect(wrapper.findComponent(SendIconButton).props().isActive).toBe(false);
  });
  it('Passing true to the SendIconButton isActive props when response is nonempty.', async () => {
    await wrapper.setProps({ ...propsData, response: 'value' });
    expect(wrapper.findComponent(SendIconButton).props().isActive).toBe(true);
  });
});
