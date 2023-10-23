import { useState } from "react";
import download from "downloadjs";

export default function ({ token }) {
  const [msg, setMsg] = useState(null);
  const [file, setFile] = useState(null);
  const [size, setSize] = useState(1000);
  const [quality, setQuality] = useState(95);
  const [err, setErr] = useState(null);

  const generateName = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const base64_image = async () => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async () => {
    if (size === "") return setErr("Must choose size");
    if (size > 2_000) return setErr("Size too large");
    const fileName = generateName();
    const fileType = file.type.split("/")[1];
    const base64 = await base64_image(file);
    const req = await fetch("/api/admin/compress-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        base64,
        name: fileName,
        type: fileType,
        size,
        quality,
      }),
    });
    const { data, size: imgSize } = await req.json();
    setMsg({ old: imgSize.old, new: imgSize.new });
    download(data, `${fileName}_${size}px.${fileType}`);
  };

  return (
    <div
      style={{
        marginBottom: "100px",
        borderRadius: "20px",
        padding: "20px",
        height: "100%",
        width: "100%",
        maxWidth: "450px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="w-100 text-center my-3">Image Compressor</h1>
      <h3>{err}</h3>
      <div style={{ display: msg === null ? "none" : "block" }}>
        <p>Old message size: {msg?.old}KB</p>
        <p>New message size: {msg?.new}KB</p>
      </div>
      <div className="my-3 w-100">
        <input
          style={{
            color: err ? "red" : "unset",
            backgroundColor: err ? "gray" : "unset",
            width: "100%",
          }}
          className="form-control"
          accept="image/*"
          type="file"
          onChange={({ target }) => {
            const fileSize = target.files[0].size / (1024 * 1024);
            if (fileSize > 5) return setErr("Image is too large");
            setErr(null);
            setFile(target.files[0]);
          }}
        />
      </div>
      <div className="my-3 w-100 text-centers">
        <label className="form-label w-100 text-center">
          Choose quality (higher is better): {quality}
        </label>
        <input
          type="range"
          className="form-range"
          min="5"
          max="95"
          value={quality}
          onChange={({ target }) => setQuality(target.value)}
        />
      </div>
      <div className="my-3 w-100 text-center">
        <label className="form-label d-block">
          Choose max width OR height in pixels:
        </label>
        <input
          className="text-center"
          type="number"
          value={size}
          onChange={({ target }) => setSize(target.value)}
        />
      </div>
      <button
        disabled={file === null ? true : false}
        className="btn btn-primary btn-lg my-3 w-100"
        onClick={handleSubmit}
      >
        Compress image
      </button>
    </div>
  );
}
