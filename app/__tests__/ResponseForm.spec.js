import { shallowMount } from '@vue/test-utils';
import ResponseForm from '@/components/molecules/ResponseForm';
import InputHandlename from '@/components/molecules/InputHandlename';
import SendIconButton from '@/components/atoms/SendIconButton';

describe('components/ResponseForm', () => {
  const propsData = {
    response: '',
    handlename: 'handlename'
  };
  const stubs = {
    InputHandlename,
    SendIconButton,
  };
  let wrapper;
  beforeEach(() => {
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
});
