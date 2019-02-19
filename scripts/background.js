onBrowserAction(notifyStartBarcodeReader);

onReadBarcode((barcode, sender, sendResponse) => {
  captureVisibleTabImage(barcode)
  .then(cropBarcodeImage)
  .then(readBarcodeFromImage)
  .then(sendResponse)
  .catch(sendResponse);
  return true;
});