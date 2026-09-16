# ⚖️ AI-Powered Legal Metrology Compliance System

> An AI-assisted inspection and decision-support platform for verifying packaged commodity labels under the Legal Metrology (Packaged Commodities) Rules, 2011.

![Status](https://img.shields.io/badge/Status-Prototype-blue)
![SIH](https://img.shields.io/badge/Smart%20India%20Hackathon-SIH26034-orange)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Tailwind-61DAFB)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)
![Database](https://img.shields.io/badge/Database-MongoDB-47A248)
![AI](https://img.shields.io/badge/AI-Python%20%2B%20OCR%20%2B%20Computer%20Vision-purple)

---

## 📌 Overview

The **AI-Powered Legal Metrology Compliance System** is an intelligent inspection and decision-support platform designed to assist regulatory enforcement officers in verifying whether packaged commodities comply with mandatory declaration norms under India's **Legal Metrology (Packaged Commodities) Rules, 2011**.

The system ingests product packaging images, extracts spatial declarations, evaluates them against a deterministic rule engine, flags potential infractions with bounding-box evidence, and guides the inspector through an auditable verification workflow.

Instead of replacing an inspector, the platform functions as an **AI-assisted enforcement copilot** that eliminates manual inspection fatigue and accelerates regulatory throughput.

---

## 🎯 Problem Statement

### Smart India Hackathon Problem Statement (SIH26034)
> **Software System to check compliance of Packaged Commodities under Legal Metrology (Packaged Commodities) Rules, 2011 by scanning products, images and labels.**

Manual verification of packaged commodities is labor-intensive, error-prone, and impossible to scale across physical retail markets and fast-expanding e-commerce platforms.

Under the 2011 Rules, product labels must mandatorily declare:
* Manufacturer / Packer / Importer Name and Address
* Country of Origin (for imported goods)
* Common or Generic Name of the Commodity
* Net Quantity (standard metric units)
* Date of Manufacture / Packing / Import
* Best Before / Expiry / Use By Date (where applicable)
* Maximum Retail Price (MRP inclusive of all taxes)
* Unit Sale Price (USP)
* Consumer Care Cell Details (Name, Address, Telephone, Email)

This system automates pre-inspection analysis via Computer Vision, OCR, Layout Understanding, and deterministic rule validation.

---

## 💡 System Workflow Pipeline

The platform follows a 5-stage pipeline:

```text
┌─────────┐      ┌─────────┐      ┌─────────────┐      ┌─────────┐      ┌─────────┐
│   SEE   │ ──►  │  READ   │ ──►  │ UNDERSTAND  │ ──►  │  CHECK  │ ──►  │   ACT   │
│ Capture │      │   OCR   │      │  NLP / VIE  │      │  Rules  │      │ Report  │
└─────────┘      └─────────┘      └─────────────┘      └─────────┘      └─────────┘
