import ReadingList from "./readinglist";

const dummyChrome = {
  bookmarks: {
    create(folderOptions, callback) {
      callback({ id: 2 });
    },
    search(folderOptions, callback) {
      callback([{ id: 2 }]);
    }
  }
};

describe("ReadingList", () => {
  const readingList = new ReadingList(dummyChrome, "_reading_list");

  test("getFolder()", async () => {
    const folder = await readingList.getFolder("_reading_list");
    expect(folder.id).toBe(2);
  });

  test("dateToString()", () => {
    // Note: `new Date(year, month, day, hour, minutes, seconds)` parameter
    //   month: beginning with 0 for January to 11 for December.
    const currentDate = new Date(2016, 9, 1, 12, 0, 0);
    expect(readingList.dateToString(currentDate)).toBe("2016-10-01 12:00:00");
  });
});
