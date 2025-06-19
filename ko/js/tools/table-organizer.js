// 표 정리 도구
class TableOrganizerTool {
  constructor() {
    this.rawData = [];
    this.columnHeaders = [];
    this.organizedData = [];
    this.currentStep = 1;
    this.setupEventListeners();
  }

  init() {
    console.log("Table Organizer Tool initialized");
    this.resetTool();
  }

  setupEventListeners() {
    // 1단계 이벤트
    const rawDataInput = document.getElementById("rawDataInput");
    const clearDataBtn = document.getElementById("clearDataBtn");
    const nextStepBtn = document.getElementById("nextStepBtn");

    // 2단계 이벤트
    const columnCountInput = document.getElementById("columnCountInput");
    const updateColumnsBtn = document.getElementById("updateColumnsBtn");
    const prevStepBtn = document.getElementById("prevStepBtn");
    const generateTableBtn = document.getElementById("generateTableBtn");

    // 3단계 이벤트
    const copyTableBtn = document.getElementById("copyTableBtn");
    const downloadTableBtn = document.getElementById("downloadTableBtn");
    const restartBtn = document.getElementById("restartBtn");

    // 이벤트 리스너 등록
    if (rawDataInput) {
      rawDataInput.addEventListener("input", this.handleDataInput.bind(this));
      rawDataInput.addEventListener("paste", this.handlePaste.bind(this));
    }

    if (clearDataBtn) {
      clearDataBtn.addEventListener("click", this.clearData.bind(this));
    }

    if (nextStepBtn) {
      nextStepBtn.addEventListener("click", this.goToStep2.bind(this));
    }

    if (columnCountInput) {
      columnCountInput.addEventListener(
        "change",
        this.updateColumnCount.bind(this)
      );
    }

    if (updateColumnsBtn) {
      updateColumnsBtn.addEventListener(
        "click",
        this.updateColumnCount.bind(this)
      );
    }

    if (prevStepBtn) {
      prevStepBtn.addEventListener("click", this.goToStep1.bind(this));
    }

    if (generateTableBtn) {
      generateTableBtn.addEventListener("click", this.generateTable.bind(this));
    }

    if (copyTableBtn) {
      copyTableBtn.addEventListener("click", this.copyTable.bind(this));
    }

    if (downloadTableBtn) {
      downloadTableBtn.addEventListener("click", this.downloadTable.bind(this));
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", this.resetTool.bind(this));
    }
  }

  // 1단계: 데이터 입력 처리
  handleDataInput(e) {
    const input = e.target.value;
    this.parseRawData(input);
    this.updateNextButton();
  }

  handlePaste(e) {
    setTimeout(() => {
      this.handleDataInput(e);
    }, 10);
  }

  parseRawData(input) {
    this.rawData = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  updateNextButton() {
    const nextStepBtn = document.getElementById("nextStepBtn");
    if (nextStepBtn) {
      nextStepBtn.disabled = this.rawData.length === 0;
    }
  }

  clearData() {
    const rawDataInput = document.getElementById("rawDataInput");
    if (rawDataInput) {
      rawDataInput.value = "";
    }
    this.rawData = [];
    this.updateNextButton();
  }

  // 단계 전환
  goToStep2() {
    if (this.rawData.length === 0) {
      alert("데이터를 입력해주세요.");
      return;
    }

    this.currentStep = 2;
    this.showStep(2);
    this.initializeColumnSetup();
  }

  goToStep1() {
    this.currentStep = 1;
    this.showStep(1);
  }

  showStep(stepNumber) {
    // 모든 단계 숨기기
    document.querySelectorAll(".step-section").forEach((section) => {
      section.classList.remove("active");
    });

    // 선택한 단계 보이기
    const targetStep = document.getElementById(this.getStepId(stepNumber));
    if (targetStep) {
      targetStep.classList.add("active");
    }
  }

  getStepId(stepNumber) {
    const stepIds = {
      1: "dataInputStep",
      2: "columnSetupStep",
      3: "resultStep",
    };
    return stepIds[stepNumber];
  }

  // 2단계: 열 설정
  initializeColumnSetup() {
    const columnCountInput = document.getElementById("columnCountInput");
    if (columnCountInput) {
      // 데이터 개수에 따라 적절한 열 개수 추정
      const estimatedColumns = this.estimateColumnCount();
      columnCountInput.value = estimatedColumns;
    }
    this.updateColumnCount();
  }

  estimateColumnCount() {
    // 간단한 추정: 데이터가 3의 배수면 3, 4의 배수면 4, 아니면 3
    if (this.rawData.length % 4 === 0 && this.rawData.length >= 4) {
      return 4;
    } else if (this.rawData.length % 3 === 0 && this.rawData.length >= 3) {
      return 3;
    } else if (this.rawData.length % 2 === 0 && this.rawData.length >= 2) {
      return 2;
    }
    return 3; // 기본값
  }

  updateColumnCount() {
    const columnCountInput = document.getElementById("columnCountInput");
    const columnHeaders = document.getElementById("columnHeaders");

    if (!columnCountInput || !columnHeaders) return;

    const columnCount = parseInt(columnCountInput.value) || 3;
    columnHeaders.innerHTML = "";

    // 기본 열 이름들
    const defaultHeaders = [
      "번호",
      "이름",
      "별명",
      "상태",
      "카테고리",
      "값",
      "설명",
      "타입",
      "등급",
      "점수",
    ];

    for (let i = 0; i < columnCount; i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "column-header-input";
      input.placeholder = `${i + 1}번째 열 이름`;
      input.value = defaultHeaders[i] || `열${i + 1}`;
      input.dataset.index = i;
      columnHeaders.appendChild(input);
    }
  }

  // 3단계: 표 생성
  generateTable() {
    this.collectColumnHeaders();

    if (this.columnHeaders.length === 0) {
      alert("열 이름을 설정해주세요.");
      return;
    }

    this.organizeData();
    this.currentStep = 3;
    this.showStep(3);
    this.displayTable();
  }

  collectColumnHeaders() {
    const headerInputs = document.querySelectorAll(".column-header-input");
    this.columnHeaders = Array.from(headerInputs).map(
      (input) => input.value.trim() || `열${parseInt(input.dataset.index) + 1}`
    );
  }

  organizeData() {
    const columnCount = this.columnHeaders.length;
    this.organizedData = [];

    // 데이터를 행 단위로 그룹화
    for (let i = 0; i < this.rawData.length; i += columnCount) {
      const row = [];
      for (let j = 0; j < columnCount; j++) {
        row.push(this.rawData[i + j] || ""); // 데이터가 부족하면 빈 문자열
      }
      this.organizedData.push(row);
    }
  }

  displayTable() {
    const tableResult = document.getElementById("tableResult");
    if (!tableResult) return;

    // 표 HTML 생성
    let tableHTML = '<table class="result-table">';

    // 헤더
    tableHTML += "<thead><tr>";
    this.columnHeaders.forEach((header) => {
      tableHTML += `<th>${this.escapeHtml(header)}</th>`;
    });
    tableHTML += "</tr></thead>";

    // 데이터 행
    tableHTML += "<tbody>";
    this.organizedData.forEach((row) => {
      tableHTML += "<tr>";
      row.forEach((cell) => {
        tableHTML += `<td>${this.escapeHtml(cell)}</td>`;
      });
      tableHTML += "</tr>";
    });
    tableHTML += "</tbody></table>";

    tableResult.innerHTML = tableHTML;
  }

  // 표 복사 기능
  async copyTable() {
    try {
      // 탭으로 구분된 텍스트 형태로 변환
      let textData = this.columnHeaders.join("\t") + "\n";
      this.organizedData.forEach((row) => {
        textData += row.join("\t") + "\n";
      });

      // HTML 형태로도 변환
      let htmlData = "<table>";
      htmlData +=
        "<tr>" +
        this.columnHeaders
          .map((h) => `<th>${this.escapeHtml(h)}</th>`)
          .join("") +
        "</tr>";
      this.organizedData.forEach((row) => {
        htmlData +=
          "<tr>" +
          row.map((c) => `<td>${this.escapeHtml(c)}</td>`).join("") +
          "</tr>";
      });
      htmlData += "</table>";

      // 클립보드에 복사
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([textData], { type: "text/plain" }),
        "text/html": new Blob([htmlData], { type: "text/html" }),
      });

      await navigator.clipboard.write([clipboardItem]);

      // 성공 메시지 표시
      this.showSuccessMessage("표가 클립보드에 복사되었습니다!");
    } catch (error) {
      // 폴백: 텍스트만 복사
      try {
        let textData = this.columnHeaders.join("\t") + "\n";
        this.organizedData.forEach((row) => {
          textData += row.join("\t") + "\n";
        });
        await navigator.clipboard.writeText(textData);
        this.showSuccessMessage(
          "표가 텍스트 형태로 클립보드에 복사되었습니다!"
        );
      } catch (fallbackError) {
        alert(
          "복사에 실패했습니다. 브라우저가 클립보드 기능을 지원하지 않습니다."
        );
      }
    }
  }

  // 엑셀 다운로드
  downloadTable() {
    try {
      // 워크북 생성
      const workbook = XLSX.utils.book_new();

      // 헤더와 데이터 결합
      const worksheetData = [this.columnHeaders, ...this.organizedData];

      // 워크시트 생성
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // 워크시트를 워크북에 추가
      XLSX.utils.book_append_sheet(workbook, worksheet, "정리된표");

      // 파일 다운로드
      const date = new Date();
      const filename = `정리된표_${ExcelWizardApp.formatDate(date)}.xlsx`;
      XLSX.writeFile(workbook, filename);
    } catch (error) {
      alert("다운로드 중 오류가 발생했습니다: " + error.message);
      console.error(error);
    }
  }

  // 도구 초기화
  resetTool() {
    this.rawData = [];
    this.columnHeaders = [];
    this.organizedData = [];
    this.currentStep = 1;
    this.showStep(1);

    // 입력 필드 초기화
    const rawDataInput = document.getElementById("rawDataInput");
    if (rawDataInput) {
      rawDataInput.value = "";
    }

    this.updateNextButton();
  }

  // 유틸리티 메서드
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  showSuccessMessage(message) {
    const resultContainer = document.querySelector(".result-container");
    if (!resultContainer) return;

    // 기존 메시지 제거
    const existingMessage = resultContainer.querySelector(".success-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // 새 메시지 생성
    const messageDiv = document.createElement("div");
    messageDiv.className = "success-message";
    messageDiv.textContent = message;

    // 첫 번째 자식 앞에 삽입
    resultContainer.insertBefore(messageDiv, resultContainer.firstChild);

    // 3초 후 제거
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  // 샘플 데이터 삽입 (개발/테스트용)
  insertSampleData() {
    const rawDataInput = document.getElementById("rawDataInput");
    if (rawDataInput) {
      const sampleData = [
        "1",
        "가",
        "가가",
        "2",
        "나",
        "나나",
        "3",
        "다",
        "다다",
        "4",
        "라",
        "라라",
      ].join("\n");

      rawDataInput.value = sampleData;
      this.handleDataInput({ target: rawDataInput });
    }
  }
}
