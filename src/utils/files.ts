import { AxiosResponse } from 'axios';

export function saveAsFile(response: AxiosResponse<Blob>, fileName: string) {
  const blob = new Blob([response.data], { type: 'application/vnd.ms-excel, application/msexcel, application/x-msexcel, application/x-ms-excel, application/vnd.ms-excel, application/x-excel, application/x-dos_ms_excel, application/xls' });
  const hiddenElement = document.createElement('a');
  document.body.appendChild(hiddenElement);
  hiddenElement.style.visibility = 'hidden';
  hiddenElement.href = window.URL.createObjectURL(blob);
  hiddenElement.target = '_blank';
  hiddenElement.download = fileName;
  hiddenElement.click();
}
