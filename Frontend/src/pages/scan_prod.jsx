import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar.jsx";

function Scan() {
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("upload");
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);

  // Open file selector
  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  // Handle selected files
  const handleFiles = (files) => {
    const selectedFiles = Array.from(files);

    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    const newImages = imageFiles.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // File input
  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  // Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    handleFiles(e.dataTransfer.files);
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];

      URL.revokeObjectURL(updated[index].url);

      updated.splice(index, 1);

      return updated;
    });
  };

  return (
    <>
        <style>{`

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }


        body {
          font-family: Arial, Helvetica, sans-serif;
          background: #f5f8fc;
          color: #172b45;
        }


        button {
          font-family: inherit;
        }


        /* =================================
           APP
        ================================= */

        .app {
          min-height: 100vh;
          display: flex;
          background: #f5f8fc;
        }




        /* =================================
           MAIN
        ================================= */

        .main {
          margin-left: 215px;

          width: calc(100% - 215px);

          min-height: 100vh;

          padding: 28px 30px;
        }


        /* =================================
           HEADER
        ================================= */

        .page-header {
          margin-bottom: 18px;
        }


        .page-header h1 {
          font-size: 20px;
          color: #172f4c;

          margin-bottom: 4px;
        }


        .page-header p {
          font-size: 10px;
          color: #73869a;
        }


        /* =================================
           TABS
        ================================= */

        .tabs {
          display: flex;
          gap: 4px;

          margin-bottom: 8px;
        }


        .tab {
          height: 31px;

          padding: 0 14px;

          border: 1px solid #d9e2eb;

          background: white;

          color: #5d7085;

          border-radius: 5px 5px 0 0;

          font-size: 9px;

          cursor: pointer;
        }


        .tab:hover {
          background: #f7faff;
        }


        .active-tab {
          color: #1766c1;

          border-color: #bcd2e9;

          background: #f8fbff;

          font-weight: 600;
        }


        /* =================================
           SCAN CARD
        ================================= */

        .scan-card {
          background: white;

          border: 1px solid #dfe7ef;

          border-radius: 6px;

          min-height: 340px;

          padding: 11px;

          display: flex;
          flex-direction: column;
        }


        /* =================================
           IMAGE AREA
        ================================= */

        .image-area {
          display: flex;

          gap: 8px;

          align-items: stretch;

          min-height: 130px;
        }


        /* =================================
           UPLOAD BOX
        ================================= */

        .upload-box {
          width: 135px;
          min-width: 135px;

          height: 128px;

          border: 1px dashed #c4d2df;

          border-radius: 5px;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          text-align: center;

          cursor: pointer;

          transition: 0.2s;
        }


        .upload-box:hover,
        .upload-box.dragging {
          border-color: #2777d1;

          background: #f5f9ff;
        }


        .cloud-icon {
          color: #2779d5;

          font-size: 24px;

          margin-bottom: 8px;
        }


        .drag-text {
          font-size: 8px;

          font-weight: 600;

          color: #374c63;

          margin-bottom: 4px;
        }


        .or {
          font-size: 7px;

          color: #8493a3;

          margin-bottom: 3px;
        }


        .upload-link {
          border: none;

          background: none;

          color: #1c73d3;

          font-size: 8px;

          font-weight: 600;

          cursor: pointer;

          margin-bottom: 8px;
        }


        .supported {
          font-size: 6px;

          color: #9aa7b5;
        }


        /* =================================
           IMAGE PREVIEW
        ================================= */

        .image-preview {
          width: 57px;
          min-width: 57px;

          height: 128px;

          position: relative;

          border-radius: 5px;

          overflow: hidden;

          background: #edf1f5;

          border: 1px solid #d9e2eb;

          display: flex;
          flex-direction: column;
        }


        .image-preview img {
          width: 100%;

          height: 99px;

          object-fit: cover;
        }


        .image-preview p {
          height: 29px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: white;

          font-size: 6px;

          color: #506378;
        }


        .remove-button {
          position: absolute;

          right: 3px;
          top: 3px;

          width: 15px;
          height: 15px;

          border: none;

          border-radius: 50%;

          background: #172d47;

          color: white;

          font-size: 11px;

          line-height: 15px;

          cursor: pointer;

          z-index: 2;
        }


        /* =================================
           ADD VIEW
        ================================= */

        .add-view {
          width: 57px;
          min-width: 57px;

          height: 128px;

          border: 1px dashed #c5d3e0;

          border-radius: 5px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          cursor: pointer;

          background: #fff;
        }


        .add-view:hover {
          background: #f7faff;

          border-color: #2777d1;
        }


        .add-view span {
          color: #176fd0;

          font-size: 18px;

          margin-bottom: 7px;
        }


        .add-view p {
          font-size: 6px;

          color: #66798d;

          text-align: center;
        }


        /* =================================
           SCAN FOOTER
        ================================= */

        .scan-footer {
          margin-top: auto;

          display: flex;

          justify-content: flex-end;

          padding-top: 12px;

          border-top: 1px solid #eef2f6;
        }


        .start-scan {
          border: none;

          background: #176bd0;

          color: white;

          height: 34px;

          padding: 0 15px;

          border-radius: 4px;

          font-size: 9px;

          cursor: pointer;

          display: flex;

          align-items: center;

          gap: 10px;

          box-shadow: 0 2px 5px
            rgba(23,107,208,0.18);
        }


        .start-scan:hover {
          background: #125bb7;
        }


        .start-scan span {
          font-size: 14px;
        }


        /* =================================
           CAMERA
        ================================= */

        .camera-card {
          background: white;

          border: 1px solid #dfe7ef;

          border-radius: 6px;

          min-height: 340px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          text-align: center;
        }


        .camera-icon {
          width: 50px;
          height: 50px;

          border-radius: 50%;

          background: #eaf3ff;

          color: #176bd0;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 24px;

          margin-bottom: 15px;
        }


        .camera-card h2 {
          font-size: 17px;

          color: #263c55;

          margin-bottom: 7px;
        }


        .camera-card p {
          font-size: 10px;

          color: #7b8b9c;

          margin-bottom: 17px;
        }


        .camera-button {
          border: none;

          background: #176bd0;

          color: white;

          border-radius: 5px;

          padding: 9px 17px;

          font-size: 10px;

          cursor: pointer;
        }


        /* =================================
           RESPONSIVE
        ================================= */

        @media (max-width: 900px) {

          .sidebar {
            width: 70px;
          }


          .logo {
            justify-content: center;
            padding: 0;
          }


          .logo span {
            display: none;
          }


          .nav-item {
            justify-content: center;
            padding: 0;
          }


          .nav-item {
            font-size: 0;
          }


          .nav-item span {
            font-size: 14px;
          }


          .inspector {
            justify-content: center;
          }


          .inspector > div:last-child {
            display: none;
          }


          .logout {
            justify-content: center;
            font-size: 0;
          }


          .main {
            margin-left: 70px;

            width: calc(100% - 70px);

            padding: 25px 20px;
          }

        }


        @media (max-width: 600px) {

          .main {
            padding: 20px 12px;
          }


          .image-area {
            flex-wrap: wrap;
          }


          .upload-box {
            width: 100%;
            min-width: 100%;
          }


          .scan-card {
            min-height: 430px;
          }


          .scan-footer {
            margin-top: 25px;
          }

        }

      `}</style>
      <Sidebar />

    <div className="app">



      {/* ================= MAIN ================= */}

      <main className="main">

        {/* HEADER */}

        <header className="page-header">

          <h1>Scan Product</h1>

          <p>
            Upload or capture product images for inspection
          </p>

        </header>


        {/* ================= TABS ================= */}

        <div className="tabs">

          <button
            className={`tab ${
              activeTab === "upload" ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab("upload")}
          >
            ♧ &nbsp; Upload Images
          </button>


          <button
            className={`tab ${
              activeTab === "camera" ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab("camera")}
          >
            ◉ &nbsp; Use Camera
          </button>

        </div>


        {/* ================= UPLOAD AREA ================= */}

        {activeTab === "upload" && (

          <section className="scan-card">

            <div className="image-area">

              {/* UPLOAD BOX */}

              <div
                className={`upload-box ${
                  dragging ? "dragging" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >

                <div className="cloud-icon">
                  ♧
                </div>

                <p className="drag-text">
                  Drag and drop images here
                </p>

                <p className="or">
                  or
                </p>

                <button
                  className="upload-link"
                  onClick={openFileSelector}
                >
                  Click to upload
                </button>

                <p className="supported">
                  Supports: JPG, PNG (Max 10MB each)
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  multiple
                  onChange={handleFileChange}
                  hidden
                />

              </div>


              {/* ================= IMAGE PREVIEWS ================= */}

              {images.map((image, index) => (

                <div className="image-preview" key={index}>

                  <img
                    src={image.url}
                    alt={`Product ${index + 1}`}
                  />

                  <button
                    className="remove-button"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>

                  <p>
                    {index === 0
                      ? "Front View"
                      : index === 1
                      ? "Back View"
                      : "Side View"}
                  </p>

                </div>

              ))}


              {/* ================= ADD BACK VIEW ================= */}

              {images.length < 2 && (

                <div
                  className="add-view"
                  onClick={openFileSelector}
                >

                  <span>＋</span>

                  <p>
                    Add Back View
                  </p>

                </div>

              )}


              {/* ================= ADD SIDE VIEW ================= */}

              {images.length < 3 && (

                <div
                  className="add-view"
                  onClick={openFileSelector}
                >

                  <span>＋</span>

                  <p>
                    Add Side View
                  </p>

                </div>

              )}

            </div>


            {/* ================= START SCAN ================= */}

            <div className="scan-footer">

              <button className="start-scan">
                Start Scan
                <span>→</span>
              </button>

            </div>

          </section>

        )}


        {/* ================= CAMERA ================= */}

        {activeTab === "camera" && (

          <section className="camera-card">

            <div className="camera-icon">
              ◉
            </div>

            <h2>
              Camera Access
            </h2>

            <p>
              Use your device camera to capture product images.
            </p>

            <button className="camera-button">
              Open Camera
            </button>

          </section>

        )}

      </main>


      {/* ================= INTERNAL CSS ================= */}

      

    </div>
    </>
  );
}

export default Scan;