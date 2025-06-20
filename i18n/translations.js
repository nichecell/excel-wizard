// Excel Wizard - 다국어 번역 데이터
const translations = {
  ko: {
    // 메타 데이터
    meta: {
      title: "Excel Wizard - 엑셀 마법사 | 온라인 엑셀 병합 도구",
      description:
        "무료 온라인 엑셀 파일 병합, 시트 생성, 데이터 정리 도구. 여러 엑셀 파일을 하나로 합치고, 새로운 시트를 생성하고, 데이터를 표 형태로 정리하세요.",
      keywords:
        "엑셀 병합, 엑셀 도구, 온라인 엑셀, 파일 합치기, 시트 생성, 데이터 정리, Excel merge, Excel tool",
    },

    // 헤더
    header: {
      title: "🧙‍♂️ Excel Wizard",
      subtitle: "엑셀 작업을 쉽고 빠르게",
    },

    // 네비게이션
    nav: {
      dataMerge: "데이터 병합",
      sheetCreator: "시트 생성",
      tableOrganizer: "표 정리",
      sheetSelector: "시트 선택",
    },

    // 데이터 병합 도구
    dataMerge: {
      title: "데이터 병합",
      diagramTitle: "💡 데이터 병합이란?",
      diagramDescription:
        "동일한 구조의 여러 엑셀 파일을 하나의 시트로 합칩니다",
      uploadText:
        "엑셀 파일들을 드래그하여 놓거나<br />아래 버튼을 클릭하여 선택하세요",
      selectFiles: "파일 선택하기",
      uploadHint: ".xls, .xlsx 파일 지원",
      processing: "처리 중...",
      stats: {
        totalFiles: "총 파일 수:",
        totalSheets: "총 시트 수:",
        totalRows: "총 데이터 행:",
      },
      buttons: {
        clear: "초기화",
        merge: "시트 합치기",
        download: "💾 통합 파일 다운로드",
      },
      preview: {
        title: "📋 미리보기",
      },
      progress: {
        checkingSheets: "시트 수 확인 중...",
        processing: "{{fileName}} 처리 중...",
        generating: "파일 생성 중...",
        complete: "완료!",
      },
      errors: {
        readError: "읽기 오류",
        processingError: "파일 처리 중 오류가 발생했습니다:",
        downloadError: "다운로드 중 오류가 발생했습니다:",
      },
      fileNames: {
        merged: "통합데이터",
        prefix: "통합_엑셀_",
      },
      preview: {
        info: "총 {{rowCount}}행 중 {{previewCount}}행 표시",
      },
    },

    // 시트 생성 도구
    sheetCreator: {
      title: "시트 생성기",
      diagramTitle: "💡 시트 생성기란?",
      diagramDescription:
        "입력한 텍스트를 각각의 이름으로 하는 시트들을 생성합니다",
      inputTitle: "시트 이름 입력",
      inputHint: "각 줄에 하나씩 시트 이름을 입력하세요",
      placeholder: "1월\n2월\n3월\n4월\n5월\n6월",
      buttons: {
        clear: "초기화",
        create: "시트 생성",
        download: "💾 엑셀 파일 다운로드",
      },
      preview: "미리보기",
      sheetCount: "총 {{count}}개의 시트가 생성됩니다",
      emptyState: "시트 이름을 입력하면 여기에 미리보기가 표시됩니다",
      success: "{{count}}개의 시트가 성공적으로 생성되었습니다!",
      error: "시트 생성 중 오류가 발생했습니다:",
      filePrefix: "시트모음_",
    },

    // 표 정리 도구
    tableOrganizer: {
      title: "데이터 표 정리",
      diagramTitle: "💡 데이터 표 정리란?",
      diagramDescription:
        "세로로 나열된 데이터를 설정한 열로 정리하여 표 형태로 만듭니다",
      step1: {
        title: "1단계: 데이터 입력",
        hint: "세로로 나열된 데이터를 입력하세요",
        placeholder: "1\n가\n가가\n2\n나\n나나\n3\n다\n다다\n4\n라\n라라",
        name: "세로 나열 데이터",
      },
      step2: {
        title: "2단계: 열 이름 설정",
        hint: "각 열의 이름을 입력하세요",
        columnCount: "열 개수: ",
        apply: "적용",
        name: "열 이름 설정",
      },
      step3: {
        title: "3단계: 결과",
        hint: "정리된 표를 확인하고 복사하세요",
        name: "정리된 표",
      },
      buttons: {
        clear: "초기화",
        next: "다음 단계",
        prev: "이전",
        generate: "표 생성",
        copy: "📋 표 복사",
        download: "💾 엑셀 다운로드",
        restart: "다시 시작",
      },
      sampleHeaders: {
        number: "번호",
        name: "이름",
        nickname: "별명",
      },
      sampleData: {
        a: "가",
        aa: "가가",
        b: "나",
        bb: "나나",
        c: "다",
        cc: "다다",
        d: "라",
        dd: "라라",
      },
      columnDefaults: [
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
      ],
      columnPlaceholder: "{{index}}번째 열 이름",
      columnDefault: "열{{index}}",
      fileNames: {
        worksheet: "정리된표",
        prefix: "정리된표_",
      },
      errors: {
        downloadError: "다운로드 중 오류가 발생했습니다:",
      },
    },

    // 시트 병합 도구
    sheetSelector: {
      title: "시트 병합",
      diagramTitle: "💡 시트 병합이란?",
      diagramDescription:
        "여러 파일에서 원하는 시트들을 선택해서 하나의 파일로 모읍니다",
      step1: {
        title: "1단계: 엑셀 파일 업로드",
        hint: "병합할 엑셀 파일들을 업로드하세요",
        uploadText:
          "엑셀 파일들을 드래그하여 놓거나<br />아래 버튼을 클릭하여 선택하세요",
      },
      step2: {
        title: "2단계: 시트 선택",
        hint: "병합할 시트들을 선택하세요",
        selectAll: "전체 선택",
        deselectAll: "전체 해제",
      },
      step3: {
        title: "3단계: 선택된 시트 미리보기",
        hint: "병합될 시트들을 확인하세요",
      },
      step4: {
        title: "4단계: 병합 완료",
        hint: "병합된 엑셀 파일을 다운로드하세요",
      },
      buttons: {
        clear: "초기화",
        analyze: "시트 분석",
        prev: "이전",
        preview: "미리보기",
        merge: "시트 병합",
        download: "💾 병합 파일 다운로드",
        startOver: "새로 시작",
      },
      fileList: {
        selected: "선택됨",
        notSelected: "선택 안됨",
      },
      sampleSheets: {
        sheet1: "시트1",
        sheet2: "시트2",
        sheet3: "시트3",
        sheetA: "시트A",
        sheetB: "시트B",
        sheetC: "시트C",
      },
      progress: {
        analyzing: "파일들을 분석하는 중...",
        analyzingFile: "{{fileName}} 분석 중...",
        merging: "시트들을 병합하는 중...",
        processing: "{{sheetName}} 처리 중...",
        waiting: "⏳ 분석 대기 중...",
      },
      info: {
        selectedSheets: "선택된 시트 정보",
        sheetCount: "{{count}}개 시트",
        mergeComplete: "병합 완료!",
        mergeSuccess:
          "총 {{sheetCount}}개의 시트가 성공적으로 병합되었습니다.<br>이제 파일을 다운로드할 수 있습니다.",
      },
      errors: {
        analysisError: "파일 분석 중 오류가 발생했습니다:",
        mergeError: "시트 병합 중 오류가 발생했습니다:",
        downloadError: "다운로드 중 오류가 발생했습니다:",
      },
      fileNames: {
        prefix: "시트병합_",
      },
      alerts: {
        previewInfo:
          '{{fileName}}의 "{{sheetName}}" 시트 미리보기\n(미리보기 기능은 3단계에서 확인할 수 있습니다)',
      },
    },

    // 공통 버튼 및 메시지
    common: {
      selectFiles: "파일 선택하기",
      fileSupport: ".xls, .xlsx 파일 지원",
      processing: "처리 중...",
      completed: "완료",
      error: "오류가 발생했습니다",
      noData: "데이터가 없습니다",
      remove: "제거",
      preview: "미리보기",
      file: "파일",
      files: "파일",
      sheet: "시트",
      sheets: "시트",
      sampleData: {
        name: "이름",
        age: "나이",
      },
      months: {
        jan: "1월",
        feb: "2월",
        mar: "3월",
        apr: "4월",
        may: "5월",
        jun: "6월",
        jul: "7월",
        aug: "8월",
        sep: "9월",
        oct: "10월",
        nov: "11월",
        dec: "12월",
      },
      defaultColumns: ["A열", "B열", "C열", "D열", "E열"],
      messages: {
        pleaseEnterData: "데이터를 입력해주세요.",
        pleaseEnterSheetNames: "시트 이름을 입력해주세요.",
        pleaseSetColumnNames: "열 이름을 설정해주세요.",
        pleaseCreateSheetsFirst: "먼저 시트를 생성해주세요.",
        noFileToDownload: "다운로드할 파일이 없습니다.",
        noMergedFile: "병합된 파일이 없습니다.",
        noSelectedSheets: "선택된 시트가 없습니다.",
        cannotLoadSheet: "시트를 불러올 수 없습니다.",
        emptySheet: "빈 시트입니다.",
        tableCopiedSuccess: "표가 클립보드에 복사되었습니다!",
        tableCopiedAsText: "표가 텍스트 형태로 클립보드에 복사되었습니다!",
        copyFailed:
          "복사에 실패했습니다. 브라우저가 클립보드 기능을 지원하지 않습니다.",
        downloadError: "다운로드 중 오류가 발생했습니다:",
      },
    },

    // 푸터
    footer: {
      copyright: "© 2024 Excel Wizard. All rights reserved.",
      community: "💬 커뮤니티",
      poweredBy: "Powered by Nichecell",
    },
  },

  en: {
    // 메타 데이터
    meta: {
      title: "Excel Wizard - Online Excel File Merger & Tools",
      description:
        "Free online Excel file merger, sheet creator, and data organizer. Merge multiple Excel files, create new sheets, and organize data into tables easily.",
      keywords:
        "excel merge, excel tools, online excel, file merger, sheet creator, data organizer, excel file combiner",
    },

    // 헤더
    header: {
      title: "🧙‍♂️ Excel Wizard",
      subtitle: "Fast and Easy Excel Operations",
    },

    // 네비게이션
    nav: {
      dataMerge: "Data Merge",
      sheetCreator: "Sheet Creator",
      tableOrganizer: "Table Organizer",
      sheetSelector: "Sheet Selector",
    },

    // 데이터 병합 도구
    dataMerge: {
      title: "Data Merge",
      diagramTitle: "💡 What is Data Merge?",
      diagramDescription:
        "Combine multiple Excel files with the same structure into one sheet",
      uploadText:
        "Drag and drop Excel files here<br />or click the button below to select files",
      selectFiles: "Select Files",
      uploadHint: ".xls, .xlsx files supported",
      processing: "Processing...",
      stats: {
        totalFiles: "Total Files:",
        totalSheets: "Total Sheets:",
        totalRows: "Total Rows:",
      },
      buttons: {
        clear: "Clear",
        merge: "Merge Sheets",
        download: "💾 Download Merged File",
      },
      preview: {
        title: "📋 Preview",
        info: "Showing {{previewCount}} out of {{rowCount}} total rows",
      },
      progress: {
        checkingSheets: "Checking sheet count...",
        processing: "Processing {{fileName}}...",
        generating: "Generating file...",
        complete: "Complete!",
      },
      errors: {
        readError: "Read Error",
        processingError: "Error occurred during file processing:",
        downloadError: "Error occurred during download:",
      },
      fileNames: {
        merged: "merged_data",
        prefix: "merged_excel_",
      },
    },

    // 시트 생성 도구
    sheetCreator: {
      title: "Sheet Creator",
      diagramTitle: "💡 What is Sheet Creator?",
      diagramDescription:
        "Create sheets with each input text as individual sheet names",
      inputTitle: "Enter Sheet Names",
      inputHint: "Enter one sheet name per line",
      placeholder: "January\nFebruary\nMarch\nApril\nMay\nJune",
      buttons: {
        clear: "Clear",
        create: "Create Sheets",
        download: "💾 Download Excel File",
      },
      preview: "Preview",
      sheetCount: "{{count}} sheets will be created",
      emptyState: "Preview will be displayed here when you enter sheet names",
      success: "{{count}} sheets have been successfully created!",
      error: "Error occurred during sheet creation:",
      filePrefix: "sheet_collection_",
    },

    // 표 정리 도구
    tableOrganizer: {
      title: "Data Table Organizer",
      diagramTitle: "💡 What is Data Table Organizer?",
      diagramDescription:
        "Organize vertically listed data into table format with specified columns",
      step1: {
        title: "Step 1: Data Input",
        hint: "Enter your vertically listed data",
        placeholder: "1\nA\nAA\n2\nB\nBB\n3\nC\nCC\n4\nD\nDD",
        name: "Vertical Data List",
      },
      step2: {
        title: "Step 2: Column Setup",
        hint: "Enter the name for each column",
        columnCount: "Number of columns: ",
        apply: "Apply",
        name: "Column Setup",
      },
      step3: {
        title: "Step 3: Result",
        hint: "Check the organized table and copy it",
        name: "Organized Table",
      },
      buttons: {
        clear: "Clear",
        next: "Next Step",
        prev: "Previous",
        generate: "Generate Table",
        copy: "📋 Copy Table",
        download: "💾 Download Excel",
        restart: "Start Over",
      },
      sampleHeaders: {
        number: "Number",
        name: "Name",
        nickname: "Nickname",
      },
      sampleData: {
        a: "A",
        aa: "AA",
        b: "B",
        bb: "BB",
        c: "C",
        cc: "CC",
        d: "D",
        dd: "DD",
      },
      columnDefaults: [
        "Number",
        "Name",
        "Nickname",
        "Status",
        "Category",
        "Value",
        "Description",
        "Type",
        "Grade",
        "Score",
      ],
      columnPlaceholder: "{{index}} column name",
      columnDefault: "Col{{index}}",
      fileNames: {
        worksheet: "organized_table",
        prefix: "organized_table_",
      },
      errors: {
        downloadError: "Error occurred during download:",
      },
    },

    // 시트 병합 도구
    sheetSelector: {
      title: "Sheet Merger",
      diagramTitle: "💡 What is Sheet Merger?",
      diagramDescription:
        "Select desired sheets from multiple files and merge them into one file",
      step1: {
        title: "Step 1: Upload Excel Files",
        hint: "Upload Excel files to be merged",
        uploadText:
          "Drag and drop Excel files here<br />or click the button below to select files",
      },
      step2: {
        title: "Step 2: Sheet Selection",
        hint: "Select sheets to be merged",
        selectAll: "Select All",
        deselectAll: "Deselect All",
      },
      step3: {
        title: "Step 3: Selected Sheets Preview",
        hint: "Check the sheets to be merged",
      },
      step4: {
        title: "Step 4: Merge Complete",
        hint: "Download the merged Excel file",
      },
      buttons: {
        clear: "Clear",
        analyze: "Analyze Sheets",
        prev: "Previous",
        preview: "Preview",
        merge: "Merge Sheets",
        download: "💾 Download Merged File",
        startOver: "Start Over",
      },
      fileList: {
        selected: "Selected",
        notSelected: "Not Selected",
      },
      sampleSheets: {
        sheet1: "Sheet1",
        sheet2: "Sheet2",
        sheet3: "Sheet3",
        sheetA: "SheetA",
        sheetB: "SheetB",
        sheetC: "SheetC",
      },
      progress: {
        analyzing: "Analyzing files...",
        analyzingFile: "Analyzing {{fileName}}...",
        merging: "Merging sheets...",
        processing: "Processing {{sheetName}}...",
        waiting: "⏳ Waiting for analysis...",
      },
      info: {
        selectedSheets: "Selected Sheets Information",
        sheetCount: "{{count}} sheets",
        mergeComplete: "Merge Complete!",
        mergeSuccess:
          "{{sheetCount}} sheets have been successfully merged.<br>You can now download the file.",
      },
      errors: {
        analysisError: "Error occurred during file analysis:",
        mergeError: "Error occurred during sheet merging:",
        downloadError: "Error occurred during download:",
      },
      fileNames: {
        prefix: "merged_sheets_",
      },
      alerts: {
        previewInfo:
          'Preview of "{{sheetName}}" sheet from {{fileName}}\n(Preview function is available in step 3)',
      },
    },

    // 공통 버튼 및 메시지
    common: {
      selectFiles: "Select Files",
      fileSupport: ".xls, .xlsx files supported",
      processing: "Processing...",
      completed: "Completed",
      error: "An error occurred",
      noData: "No data available",
      remove: "Remove",
      preview: "Preview",
      file: "File",
      files: "Files",
      sheet: "Sheet",
      sheets: "Sheets",
      sampleData: {
        name: "Name",
        age: "Age",
      },
      months: {
        jan: "January",
        feb: "February",
        mar: "March",
        apr: "April",
        may: "May",
        jun: "June",
        jul: "July",
        aug: "August",
        sep: "September",
        oct: "October",
        nov: "November",
        dec: "December",
      },
      defaultColumns: ["Col A", "Col B", "Col C", "Col D", "Col E"],
      messages: {
        pleaseEnterData: "Please enter data.",
        pleaseEnterSheetNames: "Please enter sheet names.",
        pleaseSetColumnNames: "Please set column names.",
        pleaseCreateSheetsFirst: "Please create sheets first.",
        noFileToDownload: "No file to download.",
        noMergedFile: "No merged file.",
        noSelectedSheets: "No sheets selected.",
        cannotLoadSheet: "Cannot load sheet.",
        emptySheet: "Empty sheet.",
        tableCopiedSuccess: "Table copied to clipboard!",
        tableCopiedAsText: "Table copied to clipboard as text!",
        copyFailed:
          "Copy failed. Browser does not support clipboard functionality.",
        downloadError: "Error occurred during download:",
      },
    },

    // 푸터
    footer: {
      copyright: "© 2024 Excel Wizard. All rights reserved.",
      community: "💬 Community",
      poweredBy: "Powered by Nichecell",
    },
  },
};

// 모듈 내보내기 (ES6 modules 또는 CommonJS 지원)
if (typeof module !== "undefined" && module.exports) {
  module.exports = translations;
} else if (typeof window !== "undefined") {
  window.translations = translations;
}
