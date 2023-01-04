import { convertComment } from '@/modules';

describe('modules/convertComment', () => {
  it('Can convert plain text.', () => {
    const text = 'test text';
    const correct = [{ type: 'text', body: 'test text', key: 0 }];
    const result = convertComment(text);
    expect(result).toEqual(correct);
  });
  it('Can convert anchor text.', () => {
    const text = 'test>>1test2>>3>>4';
    const correct = [
      { type: 'text', body: 'test', key: 0 },
      { type: 'anchor', body: '1', key: 1 },
      { type: 'text', body: 'test2', key: 2 },
      { type: 'anchor', body: '3', key: 3 },
      { type: 'anchor', body: '4', key: 4 },
    ];
    const result = convertComment(text);
    expect(result).toEqual(correct);
  });
});
