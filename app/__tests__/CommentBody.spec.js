import { shallowMount } from '@vue/test-utils';
import CommentBody from '@/components/molecules/CommentBody';

describe('components/CommentBody', () => {
  const propsData = {
    timestamp: '2000/01/01 00:00:00',
  };
  const slots = {
    default: '<div data-test="slotContent">slot content</div>',
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CommentBody, { propsData, slots });
  });
  it('Can receive props.', () => {
    Object.keys(propsData).forEach(key => {
      expect(wrapper.props()[key]).toBe(propsData[key]);
    });
  });
  it('timestamp props is displayed correctly.', async () => {
    const element = wrapper.find('time[data-type="timestamp"]');
    expect(element.text()).toBe('2000/01/01 00:00:00');
    await wrapper.setProps({ timestamp: '2000/01/01 00:00:01' });
    expect(element.text()).toBe('2000/01/01 00:00:01');
  });
  it('Content can be inserted in slot', () => {
    const element = wrapper.find('[data-type="body"]');
    expect(element.exists()).toBe(true);
    expect(element.text()).toBe('slot content');
  });
});
