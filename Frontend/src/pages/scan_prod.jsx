import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Scan() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("upload");
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [scanResult, setScanResult] = useState(null);

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  const handleFiles = (files) => {
    setErrorMsg("");
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

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

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

  const removeImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  };

  const resetScan = () => {
    images.forEach((img) => URL.revokeObjectURL(img.url));
    setImages([]);
    setScanResult(null);
    setErrorMsg("");
  };

  const handleStartScan = async () => {
    if (images.length === 0) {
      setErrorMsg("Please upload a product image first.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("image", images[0].file);

      const response = await fetch("http://localhost:3000/api/scan", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setScanResult(result.data);
      } else {
        setErrorMsg(result.message || "Failed to scan product.");
      }
    } catch (err) {
      console.error("Scan submission error:", err);
      setErrorMsg("Unable to connect to server. Check server status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, Helvetica, sans-serif; background: #f5f8fc; color: #172b45; }
        button { font-family: inherit; }
        .app { min-height: 100vh; display: flex; background: #f5f8fc; }
        .main { margin-left: 215px; width: calc(100% - 215px); min-height: 100vh; padding: 28px 30px; }
        .page-header { margin-bottom: 18px; }
        .page-header h1 { font-size: 20px; color: #172f4c; margin-bottom: 4px; }
        .page-header p { font-size: 10px; color: #73869a; }
        .error-banner { background-color: #ffe6e6; color: #b71c1c; border: 1px solid #f5c2c7; border-radius: 4px; padding: 8px 12px; font-size: 11px; margin-bottom: 12px; }
        .tabs { display: flex; gap: 4px; margin-bottom: 8px; }
        .tab { height: 31px; padding: 0 14px; border: 1px solid #d9e2eb; background: white; color: #5d7085; border-radius: 5px 5px 0 0; font-size: 9px; cursor: pointer; }
        .tab:hover { background: #f7faff; }
        .active-tab { color: #1766c1; border-color: #bcd2e9; background: #f8fbff; font-weight: 600; }
        .scan-card { background: white; border: 1px solid #dfe7ef; border-radius: 6px; min-height: 340px; padding: 16px; display: flex; flex-direction: column; }
        .image-area { display: flex; gap: 8px; align-items: stretch; min-height: 130px; }
        .upload-box { width: 135px; min-width: 135px; height: 128px; border: 1px dashed #c4d2df; border-radius: 5px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; cursor: pointer; transition: 0.2s; }
        .upload-box:hover, .upload-box.dragging { border-color: #2777d1; background: #f5f9ff; }
        .cloud-icon { color: #2779d5; font-size: 24px; margin-bottom: 8px; }
        .drag-text { font-size: 8px; font-weight: 600; color: #374c63; margin-bottom: 4px; }
        .or { font-size: 7px; color: #8493a3; margin-bottom: 3px; }
        .upload-link { border: none; background: none; color: #1c73d3; font-size: 8px; font-weight: 600; cursor: pointer; margin-bottom: 8px; }
        .supported { font-size: 6px; color: #9aa7b5; }
        .image-preview { width: 57px; min-width: 57px; height: 128px; position: relative; border-radius: 5px; overflow: hidden; background: #edf1f5; border: 1px solid #d9e2eb; display: flex; flex-direction: column; }
        .image-preview img { width: 100%; height: 99px; object-fit: cover; }
        .image-preview p { height: 29px; display: flex; align-items: center; justify-content: center; background: white; font-size: 6px; color: #506378; }
        .remove-button { position: absolute; right: 3px; top: 3px; width: 15px; height: 15px; border: none; border-radius: 50%; background: #172d47; color: white; font-size: 11px; line-height: 15px; cursor: pointer; z-index: 2; }
        .add-view { width: 57px; min-width: 57px; height: 128px; border: 1px dashed #c5d3e0; border-radius: 5px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; background: #fff; }
        .add-view:hover { background: #f7faff; border-color: #2777d1; }
        .add-view span { color: #176fd0; font-size: 18px; margin-bottom: 7px; }
        .add-view p { font-size: 6px; color: #66798d; text-align: center; }
        .scan-footer { margin-top: auto; display: flex; justify-content: flex-end; padding-top: 12px; border-top: 1px solid #eef2f6; gap: 8px; }
        .start-scan { border: none; background: #176bd0; color: white; height: 34px; padding: 0 15px; border-radius: 4px; font-size: 9px; cursor: pointer; display: flex; align-items: center; gap: 10px; box-shadow: 0 2px 5px rgba(23,107,208,0.18); }
        .start-scan:disabled { background: #8bb3e6; cursor: not-allowed; }
        .start-scan:hover:not(:disabled) { background: #125bb7; }
        .camera-card { background: white; border: 1px solid #dfe7ef; border-radius: 6px; min-height: 340px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .camera-icon { width: 50px; height: 50px; border-radius: 50%; background: #eaf3ff; color: #176bd0; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 15px; }
        .camera-card h2 { font-size: 17px; color: #263c55; margin-bottom: 7px; }
        .camera-card p { font-size: 10px; color: #7b8b9c; margin-bottom: 17px; }
        .camera-button { border: none; background: #176bd0; color: white; border-radius: 5px; padding: 9px 17px; font-size: 10px; cursor: pointer; }

        /* ================= RESULTS PANEL ================= */
        .result-panel { display: flex; flex-direction: column; gap: 16px; }
        .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; width: fit-content; }
        .status-compliant { background: #e6f7ec; color: #15803d; border: 1px solid #bcf0da; }
        .status-violations { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
        .status-pending { background: #fef9c3; color: #a16207; border: 1px solid #fde047; }
        
        .result-meta { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eef2f6; padding-bottom: 12px; }
        .result-id { font-size: 11px; color: #64748b; }
        .result-id strong { color: #1e293b; }
        
        .section-subhead { font-size: 12px; font-weight: 700; color: #172f4c; margin-bottom: 8px; }
        
        .data-table { width: 100%; border-collapse: collapse; font-size: 11px; }
        .data-table th, .data-table td { padding: 7px 10px; text-align: left; border-bottom: 1px solid #f1f5f9; }
        .data-table th { background: #f8fafc; color: #475569; font-weight: 600; }
        .conf-tag { font-size: 9px; padding: 2px 6px; border-radius: 3px; background: #e0e7ff; color: #3730a3; }
        
        .violations-box { background: #fef2f2; border: 1px solid #fecaca; border-radius: 4px; padding: 10px; }
        .violations-box ul { padding-left: 18px; font-size: 11px; color: #991b1b; }
        .violations-box li { margin-bottom: 3px; }

        .btn-secondary { background: white; border: 1px solid #cbd5e1; color: #334155; height: 34px; padding: 0 14px; border-radius: 4px; font-size: 9px; cursor: pointer; }
        .btn-secondary:hover { background: #f8fafc; }

        @media (max-width: 900px) {
          .main { margin-left: 70px; width: calc(100% - 70px); padding: 25px 20px; }
        }
        @media (max-width: 600px) {
          .main { padding: 20px 12px; }
          .image-area { flex-wrap: wrap; }
          .upload-box { width: 100%; min-width: 100%; }
        }
      `}</style>

      <div className="app">
        <main className="main">
          <header className="page-header">
            <h1>Scan Product</h1>
            <p>Upload or capture product images for inspection</p>
          </header>

          {errorMsg && <div className="error-banner">{errorMsg}</div>}

          {/* SHOW RESULTS WHEN BACKEND RETURNS DATA */}
          {scanResult ? (
            <section className="scan-card result-panel">
              <div className="result-meta">
                <div>
                  <span
                    className={`status-badge ${
                      scanResult.Compliance?.overallStatus === "COMPLIANT"
                        ? "status-compliant"
                        : scanResult.Compliance?.overallStatus === "POTENTIAL_VIOLATIONS"
                        ? "status-violations"
                        : "status-pending"
                    }`}
                  >
                    {scanResult.Compliance?.overallStatus?.replace(/_/g, " ") || "UNKNOWN"}
                  </span>
                </div>
                <div className="result-id">
                  Inspection ID: <strong>{scanResult.inspectionID}</strong>
                </div>
              </div>

              {/* VIOLATIONS ALERT */}
              {scanResult.Compliance?.violations?.length > 0 && (
                <div className="violations-box">
                  <div className="section-subhead" style={{ color: "#991b1b" }}>
                    Detected Violations ({scanResult.Compliance.violations.length})
                  </div>
                  <ul>
                    {scanResult.Compliance.violations.map((violation, i) => (
                      <li key={i}>{typeof violation === "string" ? violation : JSON.stringify(violation)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* EXTRACTED ATTRIBUTES TABLE */}
              <div>
                <div className="section-subhead">Extracted Product Data</div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Extracted Value</th>
                      <th>Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scanResult.extractedData &&
                      Object.entries(scanResult.extractedData).map(([key, item]) => (
                        <tr key={key}>
                          <td><strong>{key.replace(/_/g, " ").toUpperCase()}</strong></td>
                          <td>{item?.value ? String(item.value) : <span style={{ color: "#94a3b8" }}>Not Detected</span>}</td>
                          <td>
                            {item?.confidence ? (
                              <span className="conf-tag">{Math.round(item.confidence * 100)}%</span>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* ACTION BUTTONS */}
              <div className="scan-footer">
                <button type="button" className="btn-secondary" onClick={resetScan}>
                  Scan Another Product
                </button>
                <button
                  type="button"
                  className="start-scan"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard <span>→</span>
                </button>
              </div>
            </section>
          ) : (
            /* DEFAULT SCANNER VIEW */
            <>
              <div className="tabs">
                <button
                  className={`tab ${activeTab === "upload" ? "active-tab" : ""}`}
                  onClick={() => setActiveTab("upload")}
                >
                  ♧ &nbsp; Upload Images
                </button>

                <button
                  className={`tab ${activeTab === "camera" ? "active-tab" : ""}`}
                  onClick={() => setActiveTab("camera")}
                >
                  ◉ &nbsp; Use Camera
                </button>
              </div>

              {activeTab === "upload" && (
                <section className="scan-card">
                  <div className="image-area">
                    <div
                      className={`upload-box ${dragging ? "dragging" : ""}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="cloud-icon">♧</div>
                      <p className="drag-text">Drag and drop images here</p>
                      <p className="or">or</p>
                      <button
                        type="button"
                        className="upload-link"
                        onClick={openFileSelector}
                      >
                        Click to upload
                      </button>
                      <p className="supported">Supports: JPG, PNG (Max 10MB each)</p>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg"
                        multiple
                        onChange={handleFileChange}
                        hidden
                      />
                    </div>

                    {images.map((image, index) => (
                      <div className="image-preview" key={index}>
                        <img src={image.url} alt={`Product view ${index + 1}`} />
                        <button
                          type="button"
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

                    {images.length < 2 && (
                      <div className="add-view" onClick={openFileSelector}>
                        <span>＋</span>
                        <p>Add Back View</p>
                      </div>
                    )}

                    {images.length < 3 && (
                      <div className="add-view" onClick={openFileSelector}>
                        <span>＋</span>
                        <p>Add Side View</p>
                      </div>
                    )}
                  </div>

                  <div className="scan-footer">
                    <button
                      className="start-scan"
                      onClick={handleStartScan}
                      disabled={loading || images.length === 0}
                    >
                      {loading ? "Processing AI Analysis..." : "Start Scan"}
                      <span>→</span>
                    </button>
                  </div>
                </section>
              )}

              {activeTab === "camera" && (
                <section className="camera-card">
                  <div className="camera-icon">◉</div>
                  <h2>Camera Access</h2>
                  <p>Use your device camera to capture product images.</p>
                  <button className="camera-button">Open Camera</button>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Scan;