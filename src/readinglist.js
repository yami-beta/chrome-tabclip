export default class ReadingList {
  constructor(chrome, folderName) {
    this.chrome = chrome;
    this.folderName = folderName;
  }

  getFolder(folderName, parentId) {
    const folderOptions = {
      title: folderName
    };
    if (parentId) {
      folderOptions.parentId = parentId;
    }

    return this.search(folderOptions).catch(() => {
      return this.create(folderOptions);
    });
  }

  create(folderOptions) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      this.chrome.bookmarks.create(folderOptions, bookmark => {
        resolve(bookmark);
      });
    });
  }

  search(folderOptions) {
    return new Promise((resolve, reject) => {
      this.chrome.bookmarks.search(folderOptions, bookmarks => {
        if (bookmarks.length < 1) {
          reject();
        }
        return resolve(bookmarks[0]);
      });
    });
  }

  async add(pages) {
    const readingListFolder = await this.getFolder(this.folderName);
    let parentId = readingListFolder.id;
    if (pages.length > 1) {
      const date = this.dateToString(new Date());
      const dateFolder = await this.getFolder(date, readingListFolder.id);
      parentId = dateFolder.id;
    }

    pages.forEach(page => {
      this.chrome.bookmarks.create({
        parentId: parentId,
        url: page.url,
        title: page.title
      });
    });
  }

  dateToString(date) {
    const yearString = date.getFullYear();
    const monthString = `0${date.getMonth() + 1}`.slice(-2);
    const dateString = `0${date.getDate()}`.slice(-2);
    const hourString = `0${date.getHours()}`.slice(-2);
    const minuteString = `0${date.getMinutes()}`.slice(-2);
    const secondString = `0${date.getSeconds()}`.slice(-2);
    return `${yearString}-${monthString}-${dateString} ${hourString}:${minuteString}:${secondString}`;
  }
}
