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

const notifyStartBarcodeReader = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "startBarcodeRead"});
  });
}


const onCancelBarcodeReader = (callback) => {
  window.addEventListener('keyup', (event) => {
    if (event.keyCode === 27)  { //ESC
      return callback(event);
    }
  });
}