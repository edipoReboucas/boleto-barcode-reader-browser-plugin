const executeScripts = (tabId, callback, scripts) => {
  if (scripts.length) {
    return chrome.tabs.executeScript(tabId, { file: scripts.slice(0, 1).pop() }, () => {
      executeScripts(tabId, callback, scripts.slice(1));
    });
  } else {
    callback();
  }
}

const onMessageListener = topic => callback => {

  const listener = function(request, sender, sendResponse) {
    if (request.type != topic) {
      return;
    }

    return callback(request, sender, sendResponse);
  }

  const unsubscriber = () => {
    chrome.runtime.onMessage.removeListener(listener);
  };

  chrome.runtime.onMessage.addListener(listener);

  return unsubscriber;
};

const onBrowserAction = callback => {

  chrome.browserAction.onClicked.addListener(callback);

  const unsubscriber = () => {
    chrome.browserAction.onClicked.removeListener(callback);
  };

  return unsubscriber;
};

const onStartBarcodeReader = onMessageListener('startBarcodeRead');

const onReadBarcode = onMessageListener('readBarcode');

const alreadyStartedTab = [];

const notifyStartBarcodeReader = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (alreadyStartedTab.includes(tabs[0].id)) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "startBarcodeRead"});
    } else {
      alreadyStartedTab.push(tabs[0].id);
      executeScripts(
        tabs[0].id,
        () => { chrome.tabs.sendMessage(tabs[0].id, {type: "startBarcodeRead"}); },
        [
          'modules/events.js',
          'modules/barcode.js',
          'modules/barcode-reader-ui-componet.js',
          'scripts/content.js'
        ]
      );
    }
  });
}


const onCancelBarcodeReader = (callback) => {
  window.addEventListener('keyup', (event) => {
    if (event.keyCode === 27)  { //ESC
      return callback(event);
    }
  });
}