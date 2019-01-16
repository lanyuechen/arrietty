import Statis from './index';

const statis = new Statis({
  data: [
    {key: '2014年', value: [10, 100]},
    {key: '2015年', value: [12, 125]},
  ],
  format: 'YYYY年',
  type: 'y',
  extra: [
    {key: '2013年', value: [7, 90]},
    {key: '2014年', value: [10, 100]},
  ]
});

statis.calc().then(res => {console.log('** statis **', res)});

describe('Statis', () => {
  it('同环比计算', () => {
    expect(1).toBe(1);
  });
});