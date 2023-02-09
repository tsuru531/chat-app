import { shallowMount } from '@vue/test-utils';
import ResizeTextarea from '@/components/atoms/ResizeTextarea';

describe('ResizeTextarea.vue', () => {
  const propsData = {
    value: '',
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ResizeTextarea, {
      attachTo: document.body,
      propsData,
    });
  });
  it('Receive props', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('Emit when changing textarea.', async () => {
    const textarea = wrapper.find('textarea');
    await textarea.setValue('text');
    expect(wrapper.emitted().input.length).toBe(1);
  });
  it('Automatically change the height', async () => {
    const textarea = wrapper.find('textarea');
    expect(textarea.clientHeight).toBe(textarea.scrollHeight);
    await textarea.setValue('\n\n\n');
    expect(textarea.clientHeight).toBe(textarea.scrollHeight);
  });
  it('execute the focus method, textarea will be focused.', () => {
    const textarea = wrapper.find('textarea').element;
    wrapper.vm.focus();
    expect(textarea).toBe(document.activeElement);
  });
});
