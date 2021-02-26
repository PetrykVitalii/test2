/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
const getOrientation = (file: File) => new Promise<number>((res) => {
  const reader = new FileReader();
  reader.onload = (event: ProgressEvent) => {
    if (!event.target) {
      return;
    }
    const targetFileReader = event.target as FileReader;
    const view = new DataView(targetFileReader.result as ArrayBuffer);
    if (view.getUint16(0, false) !== 0xFFD8) {
      res(-2);
    }
    const length = view.byteLength;
    let offset = 2;
    while (offset < length) {
      if (view.getUint16(offset + 2, false) <= 8) res(-1);
      const marker = view.getUint16(offset, false);
      offset += 2;
      if (marker === 0xFFE1) {
        if (view.getUint32(offset += 2, false) !== 0x45786966) {
          res(-1);
        }
        const little = view.getUint16(offset += 6, false) === 0x4949;
        offset += view.getUint32(offset + 4, little);
        const tags = view.getUint16(offset, little);
        offset += 2;
        for (let i = 0; i < tags; i += 1) {
          if (view.getUint16(offset + (i * 12), little) === 0x0112) {
            res(view.getUint16(offset + (i * 12) + 8, little));
          }
        }
      } else if ((marker & 0xFF00) !== 0xFF00) {
        break;
      } else {
        offset += view.getUint16(offset, false);
      }
    }
    res(-1);
  };
  reader.readAsArrayBuffer(file);
});

export default getOrientation;
