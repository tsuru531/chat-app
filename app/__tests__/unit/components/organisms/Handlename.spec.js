import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Handlename from '@/components/organisms/Handlename';
import Modal from '@/components/atoms/Modal';
import Button from '@/components/atoms/Button';
import UnderlineButton from '@/components/atoms/UnderlineButton';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('components/Handlename', () => {
  const userModule = {
    namespaced: true,
    getters: {
      isSignedIn: () => false,
    },
  };
  const propsData = {
    value: '',
  };
  const stubs = {
    Modal,
    Button,
    UnderlineButton,
  };
  let store;
  let modules;
  let wrapper;
  beforeEach(() => {
    modules = {
      user: userModule,
    };
    store = new Vuex.Store({ modules });
    wrapper = shallowMount(Handlename, { store, localVue, propsData, stubs });
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
  it('Modal is displayed correctly.', async () => {
    const pattern = {
      false: 'signin_modal',
      true: 'handlename_modal',
    };
    for (const key of Object.keys(pattern)) {
      modules = {
        ...modules,
        user: {
          ...userModule,
          getters: {
            ...userModule.getters,
            isSignedIn: () => JSON.parse(key.toLowerCase()),
          }
        },
      };
      store = new Vuex.Store({ modules });
      wrapper = shallowMount(Handlename, { store, localVue, propsData, stubs });
      await wrapper.setData({ modal: { isDisplayed: true } });
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent({ ref: pattern[key] }).exists()).toBe(true);
    }
  });
});
