import { shallowMount } from '@vue/test-utils';
import Icons from '@/components/atoms/Icons';

describe('components/Icons', () => {
  const typeList = [
    "like-false",
    "like-true",
  ];
  const propsData = {
    type: typeList[0],
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Icons, { propsData });
  });
  it('Switch the displayed content by props.', async () => {
    const icons = wrapper.findAll(`svg[data-type]`);
    expect(icons.length).toBe(1);
    expect(icons.wrappers[0].attributes()['data-type']).toBe(typeList[0]);
    await wrapper.setProps({ type: typeList[1] });
    expect(icons.length).toBe(1);
    expect(icons.wrappers[0].attributes()['data-type']).toBe(typeList[1]);
  });
});
