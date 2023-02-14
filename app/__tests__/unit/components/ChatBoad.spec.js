import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ChatBoard from '@/pages/ChatBoard';
import Header from '@/components/organisms/Header';
import Thread from '@/components/organisms/Thread';
import Loading from '@/components/atoms/Loading';
import ResponseForm from '@/components/organisms/ResponseForm';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();
const $route = {
  params: {
    thread_id: '',
  },
};

describe('components/ChatBoard', () => {
  let threadModule = {
    namespaced: true,
    actions: {
      watch: jest.fn(),
    },
  };
  let commentsModule = {
    namespaced: true,
    actions: {
      watch: jest.fn(),
    },
  };
  let modules;
  let store;
  let mocks;
  let stubs;
  let wrapper;
  beforeEach(() => {
    modules = {
      thread: {
        ...threadModule,
        modules: {
          comments: commentsModule,
        },
      },
    };
    store = new Vuex.Store({ modules });
    mocks = { $route };
    stubs = {
      Header,
      Thread,
      Loading,
      ResponseForm,
    };
    wrapper = shallowMount(ChatBoard, { store, router, localVue, stubs });
  });
  it('Exists ResponseForm component.', () => {
    expect(wrapper.findComponent(ResponseForm).exists()).toBe(true);
  });
});
