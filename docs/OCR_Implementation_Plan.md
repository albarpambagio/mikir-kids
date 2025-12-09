# UN Exam OCR Pipeline - Implementation Plan & Research

## 1. Executive Summary
This document outlines the strategy for extracting structured data (Indonesian text, Math formulas, Figures, and MCQ options) from scanned UN (Ujian Nasional) exam PDFs.

**Selected Core Technology:** [MinerU (Magic-PDF)](https://github.com/opendatalab/MinerU)
*   **Why:** Best-in-class performance for **scanned** academic/math documents.
*   **License:** AGPL-3.0 (Open Source & Free).
*   **Capabilities:** Robust layout analysis, noise removal, and specialized LaTeX conversion for formulas.

---

## 2. Infrastructure: Local vs. Google Colab

**Verdict:** **Google Colab is highly recommended** for the initial processing phase.

| Feature | Google Colab (Free Tier) | Local Machine (Typical Laptop) |
| :--- | :--- | :--- |
| **GPU Access** | NVIDIA T4 (Included) | Varies (Often limited/None) |
| **Setup Ease** | High (Pre-installed CUDA/Python) | Low (Complex CUDA/Torch setup) |
| **Disk Space** | ~70GB+ ephemeral storage | Usage of 10GB+ for models |
| **Suitability** | **Perfect for Batch Processing** | Good for parsing/development |

**Recommendation:**
1.  **Heavy Lifting (OCR)**: Run on **Google Colab**. Upload PDFs -> Process with MinerU -> Download resulting Markdown/Images.
2.  **Light Processing (Parsing)**: Run on **Local Machine**. Process the Markdown files to JSON/Database insertion using simple Python scripts.

---

## 3. Implementation Steps

### Phase 1: The OCR Engine (Google Colab Recommended)

**Objective:** Convert raw scanned PDFs into structured Markdown with LaTeX math.

**Installation & Setup:**
```python
# In a Google Colab Cell
!pip install -U magic-pdf[full] --extra-index-url https://wheels.myhloli.com
!pip install huggingface_hub

# Download Models (This happens once)
from huggingface_hub import snapshot_download
snapshot_download(repo_id="Opendatalab/PDF-Extract-Kit", local_dir="/content/models")
# Create configuration file pointing to models
```

**Execution Pipeline:**
1.  **Input:** Folder of scanned PDFs (e.g., `UN_Matematika_2019.pdf`).
2.  **Command:**
    ```bash
    magic-pdf -p "/content/input/exam.pdf" -o "/content/output" -m auto
    ```
3.  **Output:** A folder per PDF containing:
    *   `exam.md` (The content).
    *   `images/` (Directory of cropped figures).

### Phase 2: The Parser (Local Python Script)

**Objective:** Convert the confusing Markdown into a clean JSON structure for your app.

**Directory Structure:**
```text
backend/scripts/ocr/
├── inputs/           # Place downloaded md files here
├── outputs/          # Final JSONs generate here
├── parser.py         # The logic below
└── run.py
```

**Parsing Logic (`parser.py`):**
The script needs to handle the specific chaotic structure of UN exams (often 2 columns, numbered lists).

1.  **Regex Strategy:**
    *   **Question Start:** `r"^\s*(\d+)\.\s+"` (Detects "1. ", " 10. ", etc.)
    *   **Options:** `r"^\s*([A-E])\.\s+"` (Detects "A. ", "C. ")
    *   **Math:** MinerU automatically wraps math in `$...$` or `$$...$$`. The parser just treats this as text.
    *   **Images:** Markdown links `![](images/abc.jpg)` are detected and preserved.

2.  **Pseudocode:**
    ```python
    current_question = {}
    questions = []
    
    for line in markdown_lines:
        if match_question_start(line):
            save_previous(current_question)
            current_question = new_question(line)
        elif match_option(line):
            current_question['options'].append(line)
        else:
            current_question['text'] += line
    ```

## 4. Risks & Mitigations

| Risk | Mitigation |
| :--- | :--- |
| **Indonesian Context** | MinerU supports 84+ languages. Indonesian is Latin-based and works well with standard OCR. |
| **Mixed Layouts** | UN exams often split questions across columns. MinerU's Layout Analysis is designed to "linearize" this correctly (reading down column 1, then column 2). |
| **Incorrect Formulas** | Scanned formulas are hard. MinerU 2.0 is specifically optimized for this. If it fails, manual review features in your Admin Dashboard will be needed. |

## 5. Next Action Items
1.  [ ] **Test in Colab**: Set up a quick Colab notebook to process *one* sample UN PDF.
2.  [ ] **Verify Output**: Check if the math comes out as `3x^2` (clean) or garbage.
3.  [ ] **Build Parser**: Write the specific Python Regex logic for Indonesian UN numbering formats.
