import ReadingList from "./readinglist";

const { chrome } = window;
const readingList = new ReadingList(chrome, "_reading_list");

chrome.tabs.onHighlighted.addListener(highlightInfo => {
  chrome.browserAction.setBadgeText({
    text: String(highlightInfo.tabIds.length)
  });
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({ highlighted: true, currentWindow: true }, tabs => {
    const selectedTabs = tabs.filter(tab => {
      return /^(http|https)/.test(tab.url);
    });

    if (selectedTabs.length < 1) {
      return false;
    }

    readingList.add(selectedTabs);
    chrome.tabs.remove(tabs.map(tab => tab.id));
  });
});
