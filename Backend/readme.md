# Legal Metrology Compliance System - Backend

Backend service for the **Legal Metrology Packaged Commodities Compliance System**.

The system is designed to help inspectors analyze packaged products, extract important declarations, check them against configured compliance rules, store inspection results, and provide the results to the frontend.

> **Current MVP:** The AI/OCR component is mocked. The backend currently simulates AI-extracted product information so that the complete application workflow can be developed and tested before the real AI service is integrated.

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Multer** - image/file uploads
* **CORS** - frontend communication
* **dotenv** - environment variables
* **JWT** - authentication
* **bcrypt** - password hashing

---

# 🏗️ Architecture

```text
                    React Frontend
                          │
                          │ HTTP Request
                          ▼
                  Node.js + Express
                          │
                ┌─────────┴─────────┐
                │                   │
                ▼                   ▼
           Image Upload        Authentication
             Multer             JWT / Cookie
                │
                ▼
             Mock AI
                │
                ▼
        Structured Product Data
                │
                ▼
          Compliance Rules
                │
                ▼
          Inspection Result
                │
                ▼
              MongoDB
                │
                ▼
          React Frontend
```

The eventual system will replace the Mock AI with the actual AI/OCR service.

---

# 📁 Project Structure

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── middleware/
│   ├── auth.js
│   └── upload.js
│
├── models/
│   ├── userModel.js
│   └── Inspection.js
│
├── routes/
│
├── services/
│   └── aiService.js
│
├── rules/
│
├── uploads/
│
├── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository and enter the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# ▶️ Running the Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will run on:

```text
http://localhost:3000
```

Test the server:

```text
GET /
```

Expected response:

```text
Legal Metrology API Running
```

---

# 🔌 API Endpoints

## Authentication

### Register

```text
POST /api/register
```

Creates a new user account only for Admin.

---

### Login

```text
POST /api/login
```

Authenticates the user and creates an authentication cookie.

---

### Current User

```text
GET /api/me
```

Returns the currently authenticated user.

Requires authentication.

---

### Logout

```text
POST /api/logout
```

Logs the user out by clearing the authentication cookie.

---

# 📷 Product Scanning

## Scan Product

```text
POST /api/scan
```

Accepts a product image.

### Request

```text
Content-Type: multipart/form-data
```

Form field:

```text
image = product.jpg
```

### Current flow

```text
Product Image
      ↓
Multer
      ↓
Mock AI
      ↓
Extracted Product Data
      ↓
Compliance Rule Engine
      ↓
Inspection Result
```

### Example response

```json
{
  "success": true,
  "data": {
    "product_name": "ABC Shampoo",
    "mrp": {
      "value": "₹299",
      "confidence": 0.97
    },
    "net_quantity": {
      "value": "500 ml",
      "confidence": 0.94
    },
    "country_of_origin": {
      "value": "India",
      "confidence": 0.98
    }
  }
}
```

---

# 📋 Inspection APIs

### Get all inspections

```text
GET /api/inspections
```

Returns inspection history.

---

### Get a specific inspection

```text
GET /api/inspections/:id
```

Returns complete information about an inspection.

---

# ⚠️ Violation APIs

### Confirm violation

```text
POST /api/violation/:id/confirm
```

Allows an inspector to confirm a potential violation.

---

### Dismiss violation

```text
POST /api/violation/:id/dismiss
```

Allows an inspector to dismiss a potential violation as a false positive.

The system is designed as an **inspector decision-support system**, rather than having the AI make the final legal decision.

---

# 📄 Reports

### Generate report

```text
POST /api/report/:inspectionId
```

Generates an inspection report for a specific inspection.

---

# 🤖 Mock AI

The current backend uses a mock AI service.

Example:

```text
services/
└── aiService.js
```

The mock service returns structured product information such as:

```json
{
  "product_name": {
    "value": "ABC Shampoo",
    "confidence": 0.96
  },
  "manufacturer": {
    "value": "ABC Pvt Ltd",
    "confidence": 0.91
  },
  "country_of_origin": {
    "value": "India",
    "confidence": 0.98
  },
  "net_quantity": {
    "value": "500 ml",
    "confidence": 0.94
  },
  "mrp": {
    "value": "₹299",
    "confidence": 0.97
  },
  "consumer_care": {
    "value": null,
    "confidence": 0.20
  }
}
```

This allows the backend and frontend teams to work without waiting for the real AI implementation.

---

# 🧠 Compliance Rule Engine

The rule engine receives structured information from the AI service and checks the configured compliance requirements.

Example:

```text
AI Output
   ↓
MRP             ✓
Net Quantity    ✓
Country         ✓
Consumer Care   ✗
   ↓
Rule Engine
   ↓
Potential Violation
```

Example result:

```json
{
  "status": "potential_violation",
  "violations": [
    {
      "field": "consumer_care",
      "message": "Consumer care information not detected"
    }
  ]
}
```

The AI is responsible for **extracting information**.

The rule engine is responsible for **checking the extracted information**.

The inspector makes the final decision.

---

# 🗄️ Database

MongoDB is used to store inspection information.

An inspection may contain:

```text
inspectionId
productName
image
status
declarations
violations
createdAt
inspectorDecision
```

The database allows the system to provide inspection history and retrieve previous inspections.

---

# 🔄 Complete MVP Flow

```text
Inspector
    │
    ▼
React Frontend
    │
    │ Upload Product Image
    ▼
POST /api/scan
    │
    ▼
Express Backend
    │
    ▼
Multer
    │
    ▼
Mock AI
    │
    ▼
Structured Product Data
    │
    ▼
Compliance Rule Engine
    │
    ▼
Potential Violations
    │
    ▼
MongoDB
    │
    ▼
Result
    │
    ▼
React Frontend
```

---

# 🛠️ Development Priority

For the internal hackathon prototype, development should happen in this order:

### Phase 1

* Express server
* MongoDB connection
* Authentication

### Phase 2

* Image upload
* `POST /api/scan`

### Phase 3

* Mock AI
* Structured product data

### Phase 4

* Compliance rule engine

### Phase 5

* Save inspection results

### Phase 6

* Inspection history

### Phase 7

* Confirm/dismiss violations

### Phase 8

* Frontend integration

### Phase 9

* Replace Mock AI with the real AI service

---

# 🚧 Future Improvements

The following features can be integrated after the MVP:

* Real OCR
* OpenCV image preprocessing
* Layout-aware extraction
* Multilingual OCR
* QR/barcode processing
* Physical packaging geometry
* E-commerce product analysis
* Advanced evidence processing
* Offline processing
* Production deployment
* Advanced report generation

---
