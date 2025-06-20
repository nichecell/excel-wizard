// 엑셀 병합 도구
class ExcelMergeTool {
  constructor() {
    this.uploadedFiles = [];
    this.mergedWorkbook = null;
    this.mergedData = [];
    this.setupEventListeners();
  }

  init() {
    // 도구가 활성화될 때 호출
    console.log("Excel Merge Tool initialized");
  }

  setupEventListeners() {
    // DOM 요소 가져오기
    const uploadArea = document.getElementById("uploadArea");
    const fileInput = document.getElementById("fileInput");
    const clearBtn = document.getElementById("clearBtn");
    const mergeBtn = document.getElementById("mergeBtn");
    const downloadBtn = document.getElementById("downloadBtn");

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

    if (clearBtn) {
      clearBtn.addEventListener("click", this.clearFiles.bind(this));
    }

    if (mergeBtn) {
      mergeBtn.addEventListener("click", this.mergeFiles.bind(this));
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", this.downloadMergedFile.bind(this));
    }
  }

  // 드래그 앤 드롭 핸들러
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

    this.updateFileList();
    this.updateMergeButton();
  }

  // 파일 목록 업데이트
  async updateFileList() {
    const fileList = document.getElementById("fileList");
    if (!fileList) return;

    fileList.innerHTML = "";

    for (let i = 0; i < this.uploadedFiles.length; i++) {
      const file = this.uploadedFiles[i];
      const fileItem = this.createFileItem(file, i);
      fileList.appendChild(fileItem);

      // 시트 수 확인
      this.checkSheetCount(file, i);
    }
  }

  createFileItem(file, index) {
    const fileItem = document.createElement("div");
    fileItem.className = "file-item";

    const fileInfo = document.createElement("div");
    fileInfo.className = "file-info";
    fileInfo.innerHTML = `
            <div class="file-name">${file.name}</div>
            <div class="sheet-count" id="sheet-count-${index}">${
      window.t
        ? window.t("dataMerge.progress.checkingSheets")
        : "시트 수 확인 중..."
    }</div>
        `;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = window.t ? window.t("common.remove") : "제거";
    removeBtn.onclick = () => this.removeFile(index);

    fileItem.appendChild(fileInfo);
    fileItem.appendChild(removeBtn);

    return fileItem;
  }

  async checkSheetCount(file, index) {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetCount = workbook.SheetNames.length;

        const sheetCountEl = document.getElementById(`sheet-count-${index}`);
        if (sheetCountEl) {
          sheetCountEl.textContent = window.t
            ? window.t("sheetSelector.info.sheetCount", { count: sheetCount })
            : `${sheetCount}개 시트`;
        }
      } catch (error) {
        const sheetCountEl = document.getElementById(`sheet-count-${index}`);
        if (sheetCountEl) {
          sheetCountEl.textContent = window.t
            ? window.t("dataMerge.errors.readError")
            : "읽기 오류";
        }
      }
    };

    reader.readAsArrayBuffer(file);
  }

  removeFile(index) {
    this.uploadedFiles.splice(index, 1);
    this.updateFileList();
    this.updateMergeButton();
  }

  clearFiles() {
    this.uploadedFiles = [];
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";

    this.updateFileList();
    this.updateMergeButton();
    this.hideElements(["stats", "previewContainer", "downloadSection"]);
    this.mergedWorkbook = null;
    this.mergedData = [];
  }

  updateMergeButton() {
    const mergeBtn = document.getElementById("mergeBtn");
    if (mergeBtn) {
      mergeBtn.disabled = this.uploadedFiles.length === 0;
    }
  }

  // 파일 병합
  async mergeFiles() {
    if (this.uploadedFiles.length === 0) return;

    this.showProgress(true);
    this.hideElements(["stats", "previewContainer", "downloadSection"]);

    const mergeBtn = document.getElementById("mergeBtn");
    if (mergeBtn) mergeBtn.disabled = true;

    this.mergedData = [];
    let totalSheets = 0;
    let processedSheets = 0;

    try {
      // 총 시트 수 계산
      for (const file of this.uploadedFiles) {
        const arrayBuffer = await this.readFileAsArrayBuffer(file);
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        totalSheets += workbook.SheetNames.length;
      }

      // 각 파일 처리
      for (
        let fileIndex = 0;
        fileIndex < this.uploadedFiles.length;
        fileIndex++
      ) {
        const file = this.uploadedFiles[fileIndex];
        this.updateProgressText(
          window.t
            ? window.t("dataMerge.progress.processing", {
                fileName: file.name,
              })
            : `${file.name} 처리 중...`
        );

        const arrayBuffer = await this.readFileAsArrayBuffer(file);
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        // 각 시트 처리
        workbook.SheetNames.forEach((sheetName) => {
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          if (jsonData.length > 0) {
            // 첫 번째 파일의 첫 번째 시트에서만 헤더 추가
            if (this.mergedData.length === 0) {
              this.mergedData.push(jsonData[0]);
            }

            // 데이터 행 추가 (헤더 제외)
            for (let i = 1; i < jsonData.length; i++) {
              if (
                jsonData[i].some((cell) => cell !== undefined && cell !== "")
              ) {
                this.mergedData.push(jsonData[i]);
              }
            }
          }

          processedSheets++;
          this.updateProgressBar((processedSheets / totalSheets) * 100);
        });
      }

      // 통계 업데이트
      this.updateStats({
        totalFiles: this.uploadedFiles.length,
        totalSheets: totalSheets,
        totalRows: this.mergedData.length - 1,
      });

      // 새 워크북 생성
      this.updateProgressText(
        window.t ? window.t("dataMerge.progress.generating") : "파일 생성 중..."
      );
      this.mergedWorkbook = XLSX.utils.book_new();
      const newSheet = XLSX.utils.aoa_to_sheet(this.mergedData);
      XLSX.utils.book_append_sheet(
        this.mergedWorkbook,
        newSheet,
        window.t ? window.t("dataMerge.fileNames.merged") : "통합데이터"
      );

      // 미리보기 표시
      this.showPreview();

      this.updateProgressText(
        window.t ? window.t("dataMerge.progress.complete") : "완료!"
      );
      this.showElements(["stats", "previewContainer", "downloadSection"]);
    } catch (error) {
      alert(
        (window.t
          ? window.t("dataMerge.errors.processingError")
          : "파일 처리 중 오류가 발생했습니다:") +
          " " +
          error.message
      );
      console.error(error);
    } finally {
      setTimeout(() => {
        this.showProgress(false);
        this.updateProgressBar(0);
        if (mergeBtn) mergeBtn.disabled = false;
      }, 2000);
    }
  }

  readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  // UI 업데이트 메서드들
  showProgress(show) {
    const progress = document.getElementById("progress");
    if (progress) {
      progress.classList.toggle("active", show);
    }
  }

  updateProgressText(text) {
    const progressText = document.getElementById("progressText");
    if (progressText) {
      progressText.textContent = text;
    }
  }

  updateProgressBar(percent) {
    const progressFill = document.getElementById("progressFill");
    if (progressFill) {
      progressFill.style.width = percent + "%";
    }
  }

  updateStats(stats) {
    document.getElementById("totalFiles").textContent = stats.totalFiles;
    document.getElementById("totalSheets").textContent = stats.totalSheets;
    document.getElementById("totalRows").textContent = stats.totalRows;
  }

  showPreview() {
    const previewHead = document.getElementById("previewHead");
    const previewBody = document.getElementById("previewBody");
    const previewInfo = document.getElementById("previewInfo");

    if (!previewHead || !previewBody || !previewInfo) return;

    // 미리보기 정보
    const rowCount = this.mergedData.length - 1;
    const previewCount = Math.min(100, rowCount);
    previewInfo.textContent = window.t
      ? window.t("dataMerge.preview.info", {
          rowCount: rowCount,
          previewCount: previewCount,
        })
      : `총 ${rowCount}행 중 ${previewCount}행 표시`;

    // 헤더 생성
    previewHead.innerHTML = "";
    if (this.mergedData.length > 0) {
      const headerRow = document.createElement("tr");
      this.mergedData[0].forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header || "";
        headerRow.appendChild(th);
      });
      previewHead.appendChild(headerRow);
    }

    // 바디 생성 (최대 100행)
    previewBody.innerHTML = "";
    for (let i = 1; i < Math.min(101, this.mergedData.length); i++) {
      const row = document.createElement("tr");
      this.mergedData[i].forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell || "";
        row.appendChild(td);
      });
      previewBody.appendChild(row);
    }
  }

  downloadMergedFile() {
    if (!this.mergedWorkbook) {
      alert(
        window.t
          ? window.t("common.messages.noFileToDownload")
          : "다운로드할 파일이 없습니다."
      );
      return;
    }

    try {
      const date = new Date();
      const filename = `${
        window.t ? window.t("dataMerge.fileNames.prefix") : "통합_엑셀_"
      }${ExcelWizardApp.formatDate(date)}.xlsx`;
      XLSX.writeFile(this.mergedWorkbook, filename);
    } catch (error) {
      alert(
        (window.t
          ? window.t("dataMerge.errors.downloadError")
          : "다운로드 중 오류가 발생했습니다:") +
          " " +
          error.message
      );
      console.error(error);
    }
  }

  // 유틸리티 메서드
  showElements(ids) {
    ids.forEach((id) => ExcelWizardApp.showElement(id));
  }

  hideElements(ids) {
    ids.forEach((id) => ExcelWizardApp.hideElement(id));
  }
}
