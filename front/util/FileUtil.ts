import PizZipUtils from 'pizzip/utils';

export function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

export const blobToFile = (blob: Blob,
                           fileName: string
): File => {
  return new File([blob], fileName, {
    type:         blob.type,
    lastModified: Date.now(),
  });
};

export function getBlob(doc) {
  return doc.getZip()
            .generate({
              type:        'blob',
              mimeType:
                           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              compression: 'DEFLATE',
            });
}
