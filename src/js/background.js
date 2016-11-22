import ReadingList from './readinglist';
const readingList = new ReadingList('_reading_list');

chrome.tabs.onHighlighted.addListener((highlightInfo) => {
  chrome.browserAction.setBadgeText({ text: String(highlightInfo.tabIds.length) });
});

chrome.browserAction.onClicked.addListener((currentTab) => {
  chrome.tabs.query({ highlighted: true, currentWindow: true }, (tabs) => {
    const selectedTabs = tabs.filter((tab) => {
      return /^(http|https)/.test(tab.url);
    });
    if (selectedTabs.length < 1) { return false; }

    readingList.add(selectedTabs);
    chrome.tabs.remove(tabs.map(tab => tab.id));
  });
});

