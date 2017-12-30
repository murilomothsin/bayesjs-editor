import fileDownload from 'react-file-download';

export const openFile = (document, accept, cb) => {
  const element = document.createElement('input');

  element.setAttribute('type', 'file');
  element.setAttribute('accept', accept);

  element.addEventListener('change', (e) => {
    console.log('change');
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      cb(reader.result);
    };

    reader.onerror = (error) => {
      console.warn('Error on open file :', error);
    };

    reader.readAsText(file);
  });

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const saveFile = (filename, text) => {
  fileDownload(text, filename);
};
