import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

interface UploadImagesProps {
  maxFiles?: number;
}

const UploadImages: React.FC<UploadImagesProps> = ({ maxFiles = 5 }) => {
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
    <div className="upload-container">
      <div className="image-preview-container">
        {fileUrls.map((url, index) => (
          <div className="image-preview" key={index}>
            <img
              src={url}
              alt="Preview"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid black",
              }}
            />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        <FormControl>
          <InputLabel htmlFor="image-upload">Выберите изображения</InputLabel>
          <Input
            id="image-upload"
            type="file"
            onChange={handleFileChange}
            inputProps={{ multiple: true, accept: "image/*" }}
          />
          {files && files.length > 0 && (
            <FormHelperText>Выбрано {files.length} файлов</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Загрузить
        </Button>
      </form>
    </div>
  );
};

export default UploadImages;
