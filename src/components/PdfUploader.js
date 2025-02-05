import { useEffect, useState } from "react";

const PdfUploader = ({ onFileUpload }) => {
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const savedPdf = localStorage.getItem("pdfFile");
    if (savedPdf) {
      setPdfFile({ name: savedPdf });
      onFileUpload(savedPdf);
    }
  }, [onFileUpload]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      localStorage.setItem("pdfFile", file.name);
      onFileUpload(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleFileUpload = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="w-1/3 bg-white h-1/2 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center border-dashed border-2 border-gray-300">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Upload Your Invoice
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4">
        To auto-populate fields and save time
      </p>
      <div className="w-40 h-40 bg-blue-100 flex items-center justify-center rounded-full mb-4">
        <img
          src="https://www.jobmojo.ai/staticfiles/gif/search-job.gif"
          alt="Upload Icon"
          className="w-50"
        />
      </div>
      <input
        type="file"
        id="fileInput"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={handleFileUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-4"
      >
        Upload PDF
      </button>
      {pdfFile && (
        <p className="text-sm text-gray-600 mt-4">
          Uploaded File: {pdfFile.name}
        </p>
      )}
    </div>
  );
};

export default PdfUploader;
