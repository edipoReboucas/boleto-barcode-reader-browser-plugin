const barcodeReader = new BarcodeReaderUIComponent();

onStartBarcodeReader(() => {
  barcodeReader.toogle();
});


onCancelBarcodeReader(() => {
  if (barcodeReader.isStarted()) {
    barcodeReader.destroy();
  }
})
