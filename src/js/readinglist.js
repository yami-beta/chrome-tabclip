import 'babel-polyfill';

export default class ReadingList {
  constructor(folderName) {
    this.folderName = folderName;
  }

  getFolder(folderName, parentId) {
    const folderOptions = {
      title: folderName,
    };
    if (parentId) { folderOptions.parentId = parentId; }

    return this.search(folderOptions)
               .catch(() => {
                 return this.create(folderOptions)
               });
  }

  create(folderOptions) {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.create(folderOptions, (bookmark) => {
        resolve(bookmark);
      });
    });
  }

  search(folderOptions) {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.search(folderOptions, (bookmarks) => {
        if (bookmarks.length < 1) { reject(); }
        return resolve(bookmarks[0]);
      })
    });
  }

  async add(pages) {
    const readingListFolder = await this.getFolder(this.folderName);
    const date = this.dateToString(new Date());
    const dateFolder = await this.getFolder(date, readingListFolder.id);

    pages.forEach((page) => {
      chrome.bookmarks.create({
        parentId: dateFolder.id,
        url: page.url,
        title: page.title,
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
