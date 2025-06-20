// 시트 선택 병합 도구
class SheetSelectorTool {
  constructor() {
    this.uploadedFiles = [];
    this.fileWorkbooks = new Map(); // 파일별 워크북 저장
    this.selectedSheets = []; // 선택된 시트들
    this.mergedWorkbook = null;
    this.currentStep = 1;
    this.currentPreviewSheet = null;
    this.setupEventListeners();
  }

  init() {
    console.log("Sheet Selector Tool initialized");
    this.resetTool();
  }

  setupEventListeners() {
    // 1단계 이벤트
    const uploadArea = document.getElementById("sheetSelectorUploadArea");
    const fileInput = document.getElementById("sheetSelectorFileInput");
    const clearFilesBtn = document.getElementById("clearFilesBtn");
    const analyzeFilesBtn = document.getElementById("analyzeFilesBtn");

    // 2단계 이벤트
    const selectAllBtn = document.getElementById("selectAllSheetsBtn");
    const deselectAllBtn = document.getElementById("deselectAllSheetsBtn");
    const backToUploadBtn = document.getElementById("backToUploadBtn");
    const previewSelectedBtn = document.getElementById("previewSelectedBtn");

    // 3단계 이벤트
    const backToSelectionBtn = document.getElementById("backToSelectionBtn");
    const mergeSelectedSheetsBtn = document.getElementById(
      "mergeSelectedSheetsBtn"
    );

    // 4단계 이벤트
    const downloadMergedBtn = document.getElementById("downloadMergedBtn");
    const startOverBtn = document.getElementById("startOverBtn");

    // 이벤트 리스너 등록
    if (uploadArea) {
      uploadArea.addEventListener("dragover", this.handleDragOver.bind(this));
      uploadArea.addEventListener("dragleave", this.handleDragLeave.bind(this));
      uploadArea.addEventListener("drop", this.handleDrop.bind(this));
      uploadArea.addEventListener("click", (e) => {
        // label을 클릭한 경우가 아닐 때만 파일 입력 클릭
        if (!e.target.closest("label")) {
          fileInput.click();
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", this.handleFileSelect.bind(this));
    }

    if (clearFilesBtn) {
      clearFilesBtn.addEventListener("click", this.clearFiles.bind(this));
    }

    if (analyzeFilesBtn) {
      analyzeFilesBtn.addEventListener("click", this.analyzeFiles.bind(this));
    }

    if (selectAllBtn) {
      selectAllBtn.addEventListener("click", this.selectAllSheets.bind(this));
    }

    if (deselectAllBtn) {
      deselectAllBtn.addEventListener(
        "click",
        this.deselectAllSheets.bind(this)
      );
    }

    if (backToUploadBtn) {
      backToUploadBtn.addEventListener("click", () => this.goToStep(1));
    }

    if (previewSelectedBtn) {
      previewSelectedBtn.addEventListener("click", this.goToPreview.bind(this));
    }

    if (backToSelectionBtn) {
      backToSelectionBtn.addEventListener("click", () => this.goToStep(2));
    }

    if (mergeSelectedSheetsBtn) {
      mergeSelectedSheetsBtn.addEventListener(
        "click",
        this.mergeSelectedSheets.bind(this)
      );
    }

    if (downloadMergedBtn) {
      downloadMergedBtn.addEventListener(
        "click",
        this.downloadMergedFile.bind(this)
      );
    }

    if (startOverBtn) {
      startOverBtn.addEventListener("click", this.resetTool.bind(this));
    }
  }

  // 드래그 앤 드롭 처리
  handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("dragover");
  }

  handleDragLeave(e) {
    e.currentTarget.classList.remove("dragover");
  }

  handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      this.handleFiles(e.dataTransfer.files);
    }
  }

  handleFileSelect(e) {
    if (e.target.files.length > 0) {
      this.handleFiles(e.target.files);
    }
  }

  // 파일 처리
  handleFiles(files) {
    const excelFiles = Array.from(files).filter(
      (file) => file.name.endsWith(".xls") || file.name.endsWith(".xlsx")
    );

    excelFiles.forEach((file) => {
      if (!this.uploadedFiles.find((f) => f.name === file.name)) {
        this.uploadedFiles.push(file);
      }
    });

    this.updateUploadedFilesList();
    this.updateAnalyzeButton();
  }

  updateUploadedFilesList() {
    const filesList = document.getElementById("uploadedFilesList");
    if (!filesList) return;

    filesList.innerHTML = "";

    this.uploadedFiles.forEach((file, index) => {
      const fileItem = document.createElement("div");
      fileItem.className = "uploaded-file-item";

      fileItem.innerHTML = `
                <div class="file-info">
                    <div class="file-name">${this.escapeHtml(file.name)}</div>
                    <div class="file-details">
                        <div class="file-size">
                            📁 ${this.formatFileSize(file.size)}
                        </div>
                        <div class="sheet-count-info" id="sheet-count-${index}">
                            ${
                              window.t
                                ? window.t("sheetSelector.progress.waiting")
                                : "⏳ 분석 대기 중..."
                            }
                        </div>
                    </div>
                </div>
                <button class="remove-file-btn" onclick="sheetSelectorTool.removeFile(${index})">
                    ${window.t ? window.t("common.remove") : "제거"}
                </button>
            `;

      filesList.appendChild(fileItem);
    });
  }

  removeFile(index) {
    this.uploadedFiles.splice(index, 1);
    this.updateUploadedFilesList();
    this.updateAnalyzeButton();
  }

  clearFiles() {
    this.uploadedFiles = [];
    this.fileWorkbooks.clear();
    this.selectedSheets = [];
    this.updateUploadedFilesList();
    this.updateAnalyzeButton();
  }

  updateAnalyzeButton() {
    const analyzeBtn = document.getElementById("analyzeFilesBtn");
    if (analyzeBtn) {
      analyzeBtn.disabled = this.uploadedFiles.length === 0;
    }
  }

  // 파일 분석
  async analyzeFiles() {
    if (this.uploadedFiles.length === 0) return;

    this.showProgress(
      window.t
        ? window.t("sheetSelector.progress.analyzing")
        : "파일들을 분석하는 중...",
      0
    );

    try {
      for (let i = 0; i < this.uploadedFiles.length; i++) {
        const file = this.uploadedFiles[i];
        const progress = (i / this.uploadedFiles.length) * 100;

        this.updateProgress(
          window.t
            ? window.t("sheetSelector.progress.analyzingFile", {
                fileName: file.name,
              })
            : `${file.name} 분석 중...`,
          progress
        );

        const arrayBuffer = await this.readFileAsArrayBuffer(file);
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        this.fileWorkbooks.set(file.name, workbook);

        // UI 업데이트
        const sheetCountEl = document.getElementById(`sheet-count-${i}`);
        if (sheetCountEl) {
          sheetCountEl.innerHTML = `📄 ${
            window.t
              ? window.t("sheetSelector.info.sheetCount", {
                  count: workbook.SheetNames.length,
                })
              : `${workbook.SheetNames.length}개 시트`
          }`;
        }
      }

      this.hideProgress();
      this.goToStep(2);
      this.displaySheetsList();
    } catch (error) {
      this.hideProgress();
      alert(
        (window.t
          ? window.t("sheetSelector.errors.analysisError")
          : "파일 분석 중 오류가 발생했습니다:") +
          " " +
          error.message
      );
      console.error(error);
    }
  }

  // 2단계: 시트 목록 표시
  displaySheetsList() {
    const sheetsList = document.getElementById("sheetsList");
    if (!sheetsList) return;

    sheetsList.innerHTML = "";

    this.uploadedFiles.forEach((file) => {
      const workbook = this.fileWorkbooks.get(file.name);
      if (!workbook) return;

      const fileGroup = document.createElement("div");
      fileGroup.className = "file-group";

      // 파일 헤더
      const fileHeader = document.createElement("div");
      fileHeader.className = "file-group-header";
      fileHeader.innerHTML = `
                <span class="file-icon">📁</span>
                <span>${this.escapeHtml(file.name)}</span>
                <span style="margin-left: auto; color: var(--text-secondary);">
                    ${
                      window.t
                        ? window.t("sheetSelector.info.sheetCount", {
                            count: workbook.SheetNames.length,
                          })
                        : `${workbook.SheetNames.length}개 시트`
                    }
                </span>
            `;
      fileGroup.appendChild(fileHeader);

      // 시트 목록
      workbook.SheetNames.forEach((sheetName) => {
        const sheetItem = document.createElement("div");
        sheetItem.className = "sheet-item";

        const sheetId = `${file.name}::${sheetName}`;

        sheetItem.innerHTML = `
                    <input type="checkbox" class="sheet-checkbox" id="sheet-${this.hashString(
                      sheetId
                    )}" 
                           data-file="${this.escapeHtml(file.name)}" 
                           data-sheet="${this.escapeHtml(sheetName)}">
                    <div class="sheet-info">
                        <span class="sheet-name">${this.escapeHtml(
                          sheetName
                        )}</span>
                        <button class="sheet-preview-btn" onclick="sheetSelectorTool.previewSheet('${this.escapeHtml(
                          file.name
                        )}', '${this.escapeHtml(sheetName)}')">
                            ${
                              window.t ? window.t("common.preview") : "미리보기"
                            }
                        </button>
                    </div>
                `;

        fileGroup.appendChild(sheetItem);
      });

      sheetsList.appendChild(fileGroup);
    });

    // 체크박스 이벤트 리스너 추가
    this.setupSheetCheckboxListeners();
  }

  setupSheetCheckboxListeners() {
    const checkboxes = document.querySelectorAll(".sheet-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", this.updateSelectedSheets.bind(this));
    });
  }

  updateSelectedSheets() {
    const checkboxes = document.querySelectorAll(".sheet-checkbox:checked");
    this.selectedSheets = Array.from(checkboxes).map((cb) => ({
      fileName: cb.dataset.file,
      sheetName: cb.dataset.sheet,
    }));

    const previewBtn = document.getElementById("previewSelectedBtn");
    if (previewBtn) {
      previewBtn.disabled = this.selectedSheets.length === 0;
    }
  }

  selectAllSheets() {
    const checkboxes = document.querySelectorAll(".sheet-checkbox");
    checkboxes.forEach((cb) => (cb.checked = true));
    this.updateSelectedSheets();
  }

  deselectAllSheets() {
    const checkboxes = document.querySelectorAll(".sheet-checkbox");
    checkboxes.forEach((cb) => (cb.checked = false));
    this.updateSelectedSheets();
  }

  // 시트 미리보기
  previewSheet(fileName, sheetName) {
    // 간단한 모달이나 팝업으로 미리보기를 보여줄 수 있음
    // 현재는 alert로 대체
    alert(
      window.t
        ? window.t("sheetSelector.alerts.previewInfo", {
            fileName: fileName,
            sheetName: sheetName,
          })
        : `${fileName}의 "${sheetName}" 시트 미리보기\n(미리보기 기능은 3단계에서 확인할 수 있습니다)`
    );
  }

  // 3단계: 미리보기
  goToPreview() {
    if (this.selectedSheets.length === 0) {
      alert(
        window.t
          ? window.t("common.messages.noSelectedSheets")
          : "선택된 시트가 없습니다."
      );
      return;
    }

    this.goToStep(3);
    this.displayPreviewSummary();
    this.displayPreviewTabs();
    this.displayFirstPreview();
  }

  displayPreviewSummary() {
    const summaryEl = document.getElementById("previewSummary");
    if (!summaryEl) return;

    const fileCount = new Set(this.selectedSheets.map((s) => s.fileName)).size;

    summaryEl.innerHTML = `
            <h4>${
              window.t
                ? window.t("sheetSelector.info.selectedSheets")
                : "선택된 시트 정보"
            }</h4>
            <div class="summary-stats">
                <div class="stat-item">
                    <span class="stat-number">${fileCount}</span>
                    <span class="stat-label">${
                      window.t ? window.t("common.file") : "파일"
                    }</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${
                      this.selectedSheets.length
                    }</span>
                    <span class="stat-label">${
                      window.t ? window.t("common.sheet") : "시트"
                    }</span>
                </div>
            </div>
        `;
  }

  displayPreviewTabs() {
    const tabsEl = document.getElementById("previewTabs");
    if (!tabsEl) return;

    tabsEl.innerHTML = "";

    this.selectedSheets.forEach((sheet, index) => {
      const tab = document.createElement("button");
      tab.className = `preview-tab ${index === 0 ? "active" : ""}`;
      tab.textContent = `${sheet.sheetName} (${sheet.fileName})`;
      tab.onclick = () => this.showPreviewTab(index);
      tabsEl.appendChild(tab);
    });
  }

  showPreviewTab(index) {
    // 탭 활성화
    document.querySelectorAll(".preview-tab").forEach((tab, i) => {
      tab.classList.toggle("active", i === index);
    });

    // 시트 내용 표시
    const sheet = this.selectedSheets[index];
    this.displaySheetPreview(sheet.fileName, sheet.sheetName);
  }

  displayFirstPreview() {
    if (this.selectedSheets.length > 0) {
      const sheet = this.selectedSheets[0];
      this.displaySheetPreview(sheet.fileName, sheet.sheetName);
    }
  }

  displaySheetPreview(fileName, sheetName) {
    const contentEl = document.getElementById("previewContent");
    if (!contentEl) return;

    const workbook = this.fileWorkbooks.get(fileName);
    if (!workbook || !workbook.Sheets[sheetName]) {
      contentEl.innerHTML = `<div class="preview-placeholder">${
        window.t
          ? window.t("common.messages.cannotLoadSheet")
          : "시트를 불러올 수 없습니다."
      }</div>`;
      return;
    }

    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (jsonData.length === 0) {
      contentEl.innerHTML = `<div class="preview-placeholder">${
        window.t ? window.t("common.messages.emptySheet") : "빈 시트입니다."
      }</div>`;
      return;
    }

    // 미리보기 테이블 생성 (최대 20행)
    let tableHTML = '<table class="preview-table">';

    // 헤더
    if (jsonData.length > 0) {
      tableHTML += "<thead><tr>";
      jsonData[0].forEach((cell) => {
        tableHTML += `<th>${this.escapeHtml(cell || "")}</th>`;
      });
      tableHTML += "</tr></thead>";
    }

    // 데이터 (최대 19행)
    tableHTML += "<tbody>";
    for (let i = 1; i < Math.min(20, jsonData.length); i++) {
      tableHTML += "<tr>";
      jsonData[i].forEach((cell) => {
        tableHTML += `<td>${this.escapeHtml(cell || "")}</td>`;
      });
      tableHTML += "</tr>";
    }
    tableHTML += "</tbody></table>";

    contentEl.innerHTML = tableHTML;
  }

  // 4단계: 병합 실행
  async mergeSelectedSheets() {
    if (this.selectedSheets.length === 0) return;

    this.showProgress(
      window.t
        ? window.t("sheetSelector.progress.merging")
        : "시트들을 병합하는 중...",
      0
    );

    try {
      this.mergedWorkbook = XLSX.utils.book_new();
      const usedNames = new Set();

      for (let i = 0; i < this.selectedSheets.length; i++) {
        const { fileName, sheetName } = this.selectedSheets[i];
        const progress = (i / this.selectedSheets.length) * 100;

        this.updateProgress(
          window.t
            ? window.t("sheetSelector.progress.processing", {
                sheetName: sheetName,
              })
            : `${sheetName} 처리 중...`,
          progress
        );

        const workbook = this.fileWorkbooks.get(fileName);
        if (!workbook || !workbook.Sheets[sheetName]) continue;

        // 시트 이름 중복 처리
        let finalSheetName = sheetName;
        let counter = 1;
        while (usedNames.has(finalSheetName)) {
          finalSheetName = `${sheetName}_${counter}`;
          counter++;
        }
        usedNames.add(finalSheetName);

        // 시트 복사
        const originalSheet = workbook.Sheets[sheetName];
        const newSheet = XLSX.utils.json_to_sheet(
          XLSX.utils.sheet_to_json(originalSheet, { header: 1 }),
          { skipHeader: false }
        );

        XLSX.utils.book_append_sheet(
          this.mergedWorkbook,
          newSheet,
          finalSheetName
        );
      }

      this.hideProgress();
      this.goToStep(4);
      this.displayMergeResult();
    } catch (error) {
      this.hideProgress();
      alert(
        (window.t
          ? window.t("sheetSelector.errors.mergeError")
          : "시트 병합 중 오류가 발생했습니다:") +
          " " +
          error.message
      );
      console.error(error);
    }
  }

  displayMergeResult() {
    const resultEl = document.getElementById("mergeResult");
    if (!resultEl) return;

    const sheetCount = this.mergedWorkbook
      ? this.mergedWorkbook.SheetNames.length
      : 0;

    resultEl.innerHTML = `
            <div class="merge-success-icon">✅</div>
            <h3 class="merge-success-title">${
              window.t
                ? window.t("sheetSelector.info.mergeComplete")
                : "병합 완료!"
            }</h3>
            <div class="merge-details">
                ${
                  window.t
                    ? window.t("sheetSelector.info.mergeSuccess", {
                        sheetCount: sheetCount,
                      })
                    : `총 ${sheetCount}개의 시트가 성공적으로 병합되었습니다.<br>이제 파일을 다운로드할 수 있습니다.`
                }
            </div>
        `;
  }

  downloadMergedFile() {
    if (!this.mergedWorkbook) {
      alert(
        window.t
          ? window.t("common.messages.noMergedFile")
          : "병합된 파일이 없습니다."
      );
      return;
    }

    try {
      const date = new Date();
      const filename = `${
        window.t ? window.t("sheetSelector.fileNames.prefix") : "시트병합_"
      }${ExcelWizardApp.formatDate(date)}.xlsx`;
      XLSX.writeFile(this.mergedWorkbook, filename);
    } catch (error) {
      alert(
        (window.t
          ? window.t("sheetSelector.errors.downloadError")
          : "다운로드 중 오류가 발생했습니다:") +
          " " +
          error.message
      );
      console.error(error);
    }
  }

  // 단계 전환
  goToStep(stepNumber) {
    this.currentStep = stepNumber;

    // 모든 단계 숨기기
    document.querySelectorAll(".step-section").forEach((section) => {
      section.classList.remove("active");
    });

    // 선택한 단계 보이기
    const stepIds = {
      1: "fileUploadStep",
      2: "sheetSelectionStep",
      3: "previewStep",
      4: "resultStep",
    };

    const targetStep = document.getElementById(stepIds[stepNumber]);
    if (targetStep) {
      targetStep.classList.add("active");
    }
  }

  // 진행률 표시
  showProgress(text, percent = 0) {
    let overlay = document.getElementById("progressOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "progressOverlay";
      overlay.className = "progress-overlay";
      overlay.innerHTML = `
                <div class="progress-modal">
                    <div class="progress-spinner">⏳</div>
                    <div class="progress-text" id="progressText">${text}</div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill" style="width: ${percent}%"></div>
                    </div>
                </div>
            `;
      document.body.appendChild(overlay);
    }

    document.getElementById("progressText").textContent = text;
    document.getElementById("progressFill").style.width = percent + "%";
    overlay.classList.add("active");
  }

  updateProgress(text, percent) {
    const textEl = document.getElementById("progressText");
    const fillEl = document.getElementById("progressFill");

    if (textEl) textEl.textContent = text;
    if (fillEl) fillEl.style.width = percent + "%";
  }

  hideProgress() {
    const overlay = document.getElementById("progressOverlay");
    if (overlay) {
      overlay.classList.remove("active");
    }
  }

  // 도구 초기화
  resetTool() {
    this.uploadedFiles = [];
    this.fileWorkbooks.clear();
    this.selectedSheets = [];
    this.mergedWorkbook = null;
    this.currentStep = 1;
    this.currentPreviewSheet = null;

    this.goToStep(1);
    this.updateUploadedFilesList();
    this.updateAnalyzeButton();

    const fileInput = document.getElementById("sheetSelectorFileInput");
    if (fileInput) fileInput.value = "";
  }

  // 유틸리티 메서드
  readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // 32bit int로 변환
    }
    return Math.abs(hash);
  }
}

// 전역 인스턴스 (HTML onclick 이벤트용)
let sheetSelectorTool;
