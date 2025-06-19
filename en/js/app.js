// Excel Wizard 메인 앱
class ExcelWizardApp {
  constructor() {
    this.currentTool = "merge";
    this.tools = {};
    this.init();
  }

  init() {
    this.setupNavigation();
    this.registerTools();
  }

  setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");

    navButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const toolName = button.getAttribute("data-tool");
        this.switchTool(toolName);
      });
    });
  }

  switchTool(toolName) {
    // 모든 네비게이션 버튼과 도구 컨테이너 비활성화
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    document.querySelectorAll(".tool-container").forEach((container) => {
      container.classList.remove("active");
    });

    // 선택한 도구 활성화
    const selectedButton = document.querySelector(`[data-tool="${toolName}"]`);
    const selectedContainer = document.getElementById(`${toolName}-tool`);

    if (selectedButton && selectedContainer) {
      selectedButton.classList.add("active");
      selectedContainer.classList.add("active");
      this.currentTool = toolName;

      // 도구 초기화
      if (this.tools[toolName] && this.tools[toolName].init) {
        this.tools[toolName].init();
      }
    }
  }

  registerTool(name, toolInstance) {
    this.tools[name] = toolInstance;
  }

  registerTools() {
    // 각 도구 인스턴스 등록
    if (typeof ExcelMergeTool !== "undefined") {
      this.registerTool("merge", new ExcelMergeTool());
    }

    if (typeof SheetCreatorTool !== "undefined") {
      this.registerTool("split", new SheetCreatorTool());
    }

    if (typeof TableOrganizerTool !== "undefined") {
      this.registerTool("convert", new TableOrganizerTool());
    }

    if (typeof SheetSelectorTool !== "undefined") {
      const tool = new SheetSelectorTool();
      this.registerTool("analyze", tool);
      // 전역 인스턴스 설정 (HTML onclick 이벤트용)
      window.sheetSelectorTool = tool;
    }

    // 향후 다른 도구들도 여기에 등록
  }

  // 유틸리티 메서드들
  static showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add("active");
    }
  }

  static hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.remove("active");
    }
  }

  static formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  static formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}${month}${day}_${hours}${minutes}`;
  }
}

// DOM이 로드되면 앱 초기화
document.addEventListener("DOMContentLoaded", () => {
  window.excelWizardApp = new ExcelWizardApp();
});
