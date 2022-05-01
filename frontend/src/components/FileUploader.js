import React from "react";

const FileUploader = ({ onFileSelect }) => {
  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];
    if (file.size > 1024)
      onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    else onFileSelectSuccess(file);
  };

  const onFileSelectError = () => {};
  const onFileSelectSuccess = () => {};

  return (
    <div className="file-uploader mb-3">
      <label>Photo</label>
      <input type="file" onChange={handleFileInput} />
    </div>
  );
};

export default FileUploader;
