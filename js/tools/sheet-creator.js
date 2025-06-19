// 시트 생성 도구
class SheetCreatorTool {
  constructor() {
    this.sheetNames = [];
    this.workbook = null;
    this.setupEventListeners();
  }

  init() {
    console.log("Sheet Creator Tool initialized");
  }

  setupEventListeners() {
    const sheetNamesInput = document.getElementById("sheetNamesInput");
    const clearBtn = document.getElementById("clearSheetNamesBtn");
    const createBtn = document.getElementById("createSheetsBtn");
    const downloadBtn = document.getElementById("downloadSheetsBtn");

    if (sheetNamesInput) {
      sheetNamesInput.addEventListener(
        "input",
        this.handleInputChange.bind(this)
      );
      sheetNamesInput.addEventListener("paste", this.handlePaste.bind(this));
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", this.clearInput.bind(this));
    }

    if (createBtn) {
      createBtn.addEventListener("click", this.createSheets.bind(this));
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", this.downloadWorkbook.bind(this));
    }
  }

  handleInputChange(e) {
    const input = e.target.value;
    this.parseSheetNames(input);
    this.updatePreview();
  }

  handlePaste(e) {
    // 붙여넣기 후 처리를 위해 약간 지연
    setTimeout(() => {
      this.handleInputChange(e);
    }, 10);
  }

  parseSheetNames(input) {
    // 입력된 텍스트를 줄 단위로 분할하고 빈 줄 제거
    this.sheetNames = input
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0)
      .filter((name) => this.isValidSheetName(name));
  }

  isValidSheetName(name) {
    // 엑셀 시트 이름 규칙 검사
    if (name.length === 0 || name.length > 31) return false;

    // 금지된 문자들: \ / ? * [ ]
    const invalidChars = /[\\\/\?\*\[\]]/;
    if (invalidChars.test(name)) return false;

    return true;
  }

  updatePreview() {
    const previewSection = document.getElementById("sheetPreviewSection");
    const sheetList = document.getElementById("sheetList");
    const sheetCount = document.getElementById("sheetCount");
    const createBtn = document.getElementById("createSheetsBtn");

    if (this.sheetNames.length === 0) {
      previewSection.classList.remove("active");
      createBtn.disabled = true;
      return;
    }

    previewSection.classList.add("active");
    createBtn.disabled = false;

    // 시트 목록 표시
    sheetList.innerHTML = "";

    if (this.sheetNames.length === 0) {
      sheetList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📄</div>
                    <p>시트 이름을 입력하면 여기에 미리보기가 표시됩니다</p>
                </div>
            `;
    } else {
      this.sheetNames.forEach((name, index) => {
        const sheetItem = document.createElement("div");
        sheetItem.className = "sheet-item";
        sheetItem.innerHTML = `
                    <span class="sheet-icon">📄</span>
                    <span class="sheet-name">${this.escapeHtml(name)}</span>
                `;
        sheetList.appendChild(sheetItem);
      });
    }

    // 시트 개수 표시
    sheetCount.textContent = `총 ${this.sheetNames.length}개의 시트가 생성됩니다`;
  }

  createSheets() {
    if (this.sheetNames.length === 0) {
      alert("시트 이름을 입력해주세요.");
      return;
    }

    try {
      // 새 워크북 생성
      this.workbook = XLSX.utils.book_new();

      // 각 시트 이름으로 빈 시트 생성
      this.sheetNames.forEach((sheetName) => {
        // 빈 워크시트 생성 (헤더만 있는 기본 시트)
        const worksheetData = [
          ["A열", "B열", "C열", "D열", "E열"], // 기본 헤더
          ["", "", "", "", ""], // 빈 데이터 행 하나 추가
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // 시트를 워크북에 추가
        XLSX.utils.book_append_sheet(this.workbook, worksheet, sheetName);
      });

      // 다운로드 섹션 활성화
      const downloadSection = document.getElementById("sheetDownloadSection");
      if (downloadSection) {
        downloadSection.classList.add("active");
      }

      alert(`${this.sheetNames.length}개의 시트가 성공적으로 생성되었습니다!`);
    } catch (error) {
      alert("시트 생성 중 오류가 발생했습니다: " + error.message);
      console.error(error);
    }
  }

  downloadWorkbook() {
    if (!this.workbook) {
      alert("먼저 시트를 생성해주세요.");
      return;
    }

    try {
      const date = new Date();
      const filename = `시트모음_${ExcelWizardApp.formatDate(date)}.xlsx`;
      XLSX.writeFile(this.workbook, filename);
    } catch (error) {
      alert("다운로드 중 오류가 발생했습니다: " + error.message);
      console.error(error);
    }
  }

  clearInput() {
    const sheetNamesInput = document.getElementById("sheetNamesInput");
    const previewSection = document.getElementById("sheetPreviewSection");
    const downloadSection = document.getElementById("sheetDownloadSection");
    const createBtn = document.getElementById("createSheetsBtn");

    if (sheetNamesInput) {
      sheetNamesInput.value = "";
    }

    this.sheetNames = [];
    this.workbook = null;

    if (previewSection) {
      previewSection.classList.remove("active");
    }

    if (downloadSection) {
      downloadSection.classList.remove("active");
    }

    if (createBtn) {
      createBtn.disabled = true;
    }
  }

  // 유틸리티 메서드
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // 샘플 데이터 삽입 (개발/테스트용)
  insertSampleData() {
    const sheetNamesInput = document.getElementById("sheetNamesInput");
    if (sheetNamesInput) {
      const sampleData = [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ].join("\n");

      sheetNamesInput.value = sampleData;
      this.handleInputChange({ target: sheetNamesInput });
    }
  }
}
