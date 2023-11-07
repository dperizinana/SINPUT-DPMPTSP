import axios from "axios";
import "./homepage.css";
const FiturDownload = () => {
  const downloadAndRename = async (link) => {
    try {
      // Replace 'your_download_url' with the actual URL of the file to download.
      const downloadUrl = link;
      // Make an HTTP request to download the file.
      const response = await axios.get(downloadUrl, {
        responseType: "blob", // Specify the response type as a binary blob.
      });

      // Get the content type from the response headers to determine the file extension.
      const contentType = response.headers["content-type"];

      // Determine the file extension based on the content type.
      let fileExtension = "pdf"; // Default to PDF if the content type is unknown.

      if (contentType === "application/pdf") {
        fileExtension = "pdf";
      }
      // Add more checks for other content types if needed.

      // Create a blob URL for the downloaded file.
      const blob = new Blob([response.data]);
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download.
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;

      // Generate a unique filename for the downloaded file.
      const filename = `file_laporanPBG.${fileExtension}`;
      downloadLink.download = filename;

      // Trigger the download.
      downloadLink.click();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return {
    downloadAndRename,
  };
};

export default FiturDownload;
