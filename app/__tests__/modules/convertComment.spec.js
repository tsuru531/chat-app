import { convertComment } from '@/modules';

describe('modules/convertComment', () => {
  it('Can convert plain text.', () => {
    const text = 'test text';
    const correct = [{ type: 'text', body: 'test text' }];
    const result = convertComment(text);
    expect(result).toEqual(correct);
  });
  it('Can convert anchor text.', () => {
    const text = 'test&gt;&gt;1test2&gt;&gt;3&gt;&gt;4';
    const correct = [
      { type: 'text', body: 'test' },
      { type: 'anchor', body: '1' },
      { type: 'text', body: 'test2' },
      { type: 'anchor', body: '3' },
      { type: 'anchor', body: '4' },
    ];
    const result = convertComment(text);
    expect(result).toEqual(correct);
  });
});
