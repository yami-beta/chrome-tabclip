import assert from 'assert';
import ReadingList from '../src/js/readinglist';

describe('ReadingList', () => {
  const readingList = new ReadingList('_reading_list');

  it('dateToString()', () => {
    // Note: `new Date(year, month, day, hour, minutes, seconds)` parameter
    //   month: beginning with 0 for January to 11 for December.
    const currentDate = new Date(2016, 9, 1, 12, 0, 0);
    assert.equal(readingList.dateToString(currentDate), '2016-10-01 12:00:00');
  });
});
