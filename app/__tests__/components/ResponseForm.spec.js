import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ResponseForm from '@/components/organisms/ResponseForm';
import ResizeTextarea from '@/components/atoms/ResizeTextarea';
import InputHandlename from '@/components/molecules/InputHandlename';
import SendIconButton from '@/components/molecules/SendIconButton';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('components/ResponseForm', () => {
  let defaultData = {
    body: '',
    handlename: '',
  };
  let threadModule;
  let commentsModule;
  let modules;
  let store;
  let propsData;
  let stubs;
  let wrapper;
  beforeEach(() => {
    threadModule = {
      namespaced: true,
    };
    commentsModule = {
      namespaced: true,
      actions: {
        create: jest.fn(),
      },
    };
    modules = {
      thread: {
        ...threadModule,
        modules: {
          comments: commentsModule,
        },
      },
    };
    store = new Vuex.Store({ modules });
    propsData = {
      body: '',
    };
    stubs = {
      ResizeTextarea,
      InputHandlename,
      SendIconButton,
    };
    wrapper = shallowMount(ResponseForm, { store, localVue, propsData, stubs });
  });
  it('Exists InputHandlename component.', () => {
    const child = wrapper.findComponent(InputHandlename);
    expect(child.exists()).toBe(true);
  });
  it('Can pass props to InputHandlename component.', () => {
    const child = wrapper.findComponent(InputHandlename);
    expect(child.props().value).toBe(defaultData.handlename);
  });
  it('isNonemptyForm is false when body is empty.', async () => {
    await wrapper.setProps({ ...propsData, body: '' });
    expect(wrapper.vm.isNonemptyForm).toBe(false);
  });
  it('isNonemptyForm is true when body is nonempty.', async () => {
    await wrapper.setProps({ ...propsData, body: 'value' });
    expect(wrapper.vm.isNonemptyForm).toBe(true);
  });
  it('Passing false to the SendIconButton isActive props when body is empty.', async () => {
    await wrapper.setProps({ ...propsData, body: '' });
    expect(wrapper.findComponent(SendIconButton).props().isActive).toBe(false);
  });
  it('Passing true to the SendIconButton isActive props when body is nonempty.', async () => {
    await wrapper.setProps({ ...propsData, body: 'value' });
    expect(wrapper.findComponent(SendIconButton).props().isActive).toBe(true);
  });
  it('Change handlename with input emit of InputHandlename.', () => {
    wrapper.findComponent(InputHandlename).vm.$emit('input', 'value');
    expect(wrapper.vm.handlename).toBe('value');
  });
  it('Execute action[thread/comments/create] when SendIconButton emit click.', async () => {
    await wrapper.setProps({ ...propsData, body: 'test' });
    wrapper.findComponent(SendIconButton).vm.$emit('click');
    expect(commentsModule.actions.create).toHaveBeenCalled();
  });
  it('Do not execute action[thread/comments/create] if body is empty.', async () => {
    await wrapper.setProps({ ...propsData, body: '' });
    wrapper.findComponent(SendIconButton).vm.$emit('click');
    expect(commentsModule.actions.create).not.toHaveBeenCalled();
  });
});
