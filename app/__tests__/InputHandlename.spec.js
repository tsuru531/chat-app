import { shallowMount } from '@vue/test-utils';
import InputHandlename from '@/components/molecules/InputHandlename';
import Label from '@/components/atoms/Label';

describe('components/InputHandlename', () => {
  const propsData = {
    value: 'test',
  };
  const stubs = {
    Label,
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(InputHandlename, { propsData, stubs });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Exists Label component.', () => {
    const child = wrapper.findComponent(Label);
    expect(child.exists()).toBe(true);
  });
  it('Insert "ハンドルネーム" into slot of Label component.', () => {
    const child = wrapper.findComponent(Label);
    expect(child.vm.$slots.default[0].text).toBe('ハンドルネーム');
  });
  it('Exists input.', () => {
    const inputList = wrapper.findAll('input');
    expect(inputList.length).toBe(1);
    const input = inputList.at(0);
    expect(input.attributes().type).toBe('text');
    expect(input.attributes().placeholder).toBe('名無しさん');
  });
  it('Input value reflects props.', () => {
    const input = wrapper.find('input');
    expect(input.element.value).toBe(propsData.value);
  });
  it('Emit input when value of input changes.', () => {
    const input = wrapper.find('input');
    input.setValue('test2');
    expect(wrapper.emitted().input.length).toBe(1);
    expect(wrapper.emitted().input[0]).toEqual(['test2']);
  });
});
