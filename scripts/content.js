var contentScriptAlreadyLoaded;

if (!contentScriptAlreadyLoaded) {

  var barcodeReader = new BarcodeReaderUIComponent();

  onStartBarcodeReader(() => {
    barcodeReader.toogle();
  });
  
  
  onCancelBarcodeReader(() => {
    if (barcodeReader.isStarted()) {
      barcodeReader.destroy();
    }
  });
}

contentScriptAlreadyLoaded = true;