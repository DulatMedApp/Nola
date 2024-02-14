import React, { useState } from "react";
import { Button } from "@mui/material";
import theme from "../../../src/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import RemoveCircle from "@mui/icons-material/RemoveCircle";

interface AttachmentUpload {
  maxFiles?: number;
}

const AttachmentUpload: React.FC<AttachmentUpload> = ({ maxFiles = 5 }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > maxFiles) {
      alert(`Максимальное количество файлов: ${maxFiles}`);
      event.target.value = "";
      return;
    }

    if (selectedFiles) {
      setFiles(selectedFiles);

      const newFileUrls = Array.from(selectedFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setFileUrls((prevFileUrls) => [...prevFileUrls, ...newFileUrls]);
    }
  };
  const handleDelete = (index: number) => {
    const updatedUrls = [...fileUrls];
    updatedUrls.splice(index, 1);
    setFileUrls(updatedUrls);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const response = await fetch("/api/upload-images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Images uploaded successfully!");
      } else {
        console.error("Error uploading images:", response.statusText);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="upload-container">
        <div className="image-preview-container">
          {fileUrls.map((url, index) => (
            <div className="image-preview" key={index}>
              <img
                src={url}
                alt="Превью"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid black",
                }}
              />
              <Button
                // variant="outlined"
                color="error"
                className="delete-button"
                endIcon={<RemoveCircle />}
                size="small"
                onClick={() => handleDelete(index)}
                style={{
                  // color: "white",
                  // backgroundColor: "red",
                  // width: "-10px",
                  // height: "15px",
                  position: "absolute",
                  // top: "5px",
                  // right: "580px",
                  // borderRadius: "50%",
                  // cursor: "pointer",
                  // visibility: "visible", // Add this line to make the button visible
                }}>
                {/* &times; */}
              </Button>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          {files && files.length > 0 && <p>Выбрано {files.length} файлов</p>}
        </form>
      </div>
    </ThemeProvider>
  );
};

export default AttachmentUpload;
