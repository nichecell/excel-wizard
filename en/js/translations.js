// English translations
const translations = {
  // Header
  appSubtitle: "Fast and Easy Excel Operations",
  
  // Navigation
  navDataMerge: "Data Merge",
  navSheetCreator: "Sheet Creator", 
  navTableOrganizer: "Table Organizer",
  navSheetSelector: "Sheet Selector",
  
  // Data Merge Tool
  dataMergeTitle: "Data Merge",
  dataMergeDescription: "What is Data Merge?",
  dataMergeExplanation: "Combine multiple Excel files with the same structure into one sheet",
  uploadAreaText: "Drag and drop Excel files here<br />or click the button below to select files",
  selectFilesBtn: "Select Files",
  fileFormatHint: ".xls, .xlsx files supported",
  processing: "Processing...",
  totalFiles: "Total Files:",
  totalSheets: "Total Sheets:",
  totalRows: "Total Rows:",
  clearBtn: "Clear",
  mergeBtn: "Merge Sheets",
  preview: "📋 Preview",
  downloadBtn: "💾 Download Merged File",
  
  // Sheet Creator Tool
  sheetCreatorTitle: "Sheet Creator",
  sheetCreatorDescription: "What is Sheet Creator?",
  sheetCreatorExplanation: "Create sheets with each input text as individual sheet names",
  sheetNamesInputTitle: "Enter Sheet Names",
  sheetNamesInputHint: "Enter one sheet name per line",
  sheetNamesPlaceholder: "January\\nFebruary\\nMarch\\nApril\\nMay\\nJune",
  createSheetsBtn: "Create Sheets",
  previewTitle: "Preview",
  downloadSheetsBtn: "💾 Download Excel File",
  
  // Table Organizer Tool
  tableOrganizerTitle: "Data Table Organizer",
  tableOrganizerDescription: "What is Data Table Organizer?",
  tableOrganizerExplanation: "Organize vertically listed data into table format with specified columns",
  step1Title: "Step 1: Data Input",
  step1Hint: "Enter your vertically listed data",
  step1Placeholder: "1\\nA\\nAA\\n2\\nB\\nBB\\n3\\nC\\nCC\\n4\\nD\\nDD",
  nextStepBtn: "Next Step",
  step2Title: "Step 2: Column Names Setup",
  step2Hint: "Enter the name for each column",
  columnCount: "Number of columns:",
  applyBtn: "Apply",
  prevStepBtn: "Previous",
  generateTableBtn: "Generate Table",
  step3Title: "Step 3: Result",
  step3Hint: "Check the organized table and copy it",
  copyTableBtn: "📋 Copy Table",
  downloadTableBtn: "💾 Download Excel",
  restartBtn: "Start Over",
  
  // Sheet Selector Tool
  sheetSelectorTitle: "Sheet Merger",
  sheetSelectorDescription: "What is Sheet Merger?",
  sheetSelectorExplanation: "Select desired sheets from multiple files and merge them into one file",
  uploadStep1Title: "Step 1: Upload Excel Files",
  uploadStep1Hint: "Upload Excel files to be merged",
  selectAllBtn: "Select All",
  deselectAllBtn: "Deselect All",
  analyzeBtn: "Analyze Sheets",
  selectionStep2Title: "Step 2: Sheet Selection",
  selectionStep2Hint: "Select sheets to be merged",
  previewBtn: "Preview",
  previewStep3Title: "Step 3: Selected Sheets Preview",
  previewStep3Hint: "Check the sheets to be merged",
  mergeSelectedBtn: "Merge Sheets",
  resultStep4Title: "Step 4: Merge Complete",
  resultStep4Hint: "Download the merged Excel file",
  downloadMergedBtn: "💾 Download Merged File",
  startOverBtn: "Start Over",
  
  // Common messages
  sheetsCount: "sheets",
  checkingSheets: "Checking sheets...",
  analyzing: "Analyzing...",
  awaitingAnalysis: "⏳ Awaiting analysis...",
  removeBtn: "Remove",
  files: "files",
  selectedInfo: "Selected Sheet Information",
  mergeComplete: "✅ Merge Complete!",
  mergeCompleteMsg: "sheets have been successfully merged.\\nYou can now download the file.",
  
  // File examples
  file1Name: "File1.xlsx",
  file2Name: "File2.xlsx", 
  mergedFileName: "MergedFile.xlsx",
  generatedFileName: "GeneratedFile.xlsx",
  organizedTable: "Organized Table",
  
  // Table headers
  nameHeader: "Name",
  ageHeader: "Age", 
  numberHeader: "Number",
  nicknameHeader: "Nickname",
  
  // Sample data
  sampleName1: "John",
  sampleName2: "Jane", 
  sampleName3: "Mike",
  sampleName4: "Sarah",
  sampleNick1: "Johnny",
  sampleNick2: "Janie",
  sampleNick3: "Mikey",
  sampleNick4: "Sally",
  
  // Footer
  footerText: "&copy; 2024 Excel Wizard. All rights reserved."
};

// Export for use in other files
window.translations = translations;