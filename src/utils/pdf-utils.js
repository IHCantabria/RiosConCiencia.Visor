export const downloadPDF = (pdf, name) => {
  const urlFile = window.URL.createObjectURL(pdf.data);
  const link = document.createElement("a");
  link.href = urlFile;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
