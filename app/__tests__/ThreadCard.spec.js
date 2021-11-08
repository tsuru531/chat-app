import { shallowMount } from '@vue/test-utils'
import ThreadCard from '@/components/organisms/ThreadCard'

describe('ThreadCard.vue', () => {
  const thread = {
    title: 'title',
    topic: '雑談',
    gender: '男',
    age: '10代',
    place: '東京都'
  }
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(ThreadCard, {
      propsData: { thread }
    })
  })
  it('props', () => {
    const threadProps = wrapper.props().thread
    expect(threadProps.title).toBe(thread.title)
    expect(threadProps.topic).toBe(thread.topic)
    expect(threadProps.gender).toBe(thread.gender)
    expect(threadProps.age).toBe(thread.age)
    expect(threadProps.place).toBe(thread.place)
  })
  it('Filter empty string', async () => {
    const { topic, gender, age, place } = thread
    expect(wrapper.vm.chipValues).toStrictEqual([topic, gender, age, place])
    await wrapper.setProps({
      thread: {
        ...wrapper.vm.thread,
        place: ''
      }
    })
    expect(wrapper.vm.chipValues).toStrictEqual([topic, gender, age])
  })
})