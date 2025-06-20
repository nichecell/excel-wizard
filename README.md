# Excel Wizard 🧙‍♂️

JavaScript 기반 다국어 엑셀 도구 모음

## 🌍 다국어 지원

이 프로젝트는 **JavaScript 기반 i18n 시스템**을 사용하여 무제한 언어 확장이 가능합니다.

### 현재 지원 언어

- 🇰🇷 한국어 (기본값)
- 🇺🇸 English

### 새 언어 추가 방법

1. `i18n/translations.js`에 언어 객체 추가:

```javascript
const translations = {
  ko: {
    /* 한국어 번역 */
  },
  en: {
    /* 영어 번역 */
  },
  ja: {
    /* 일본어 번역 */
  }, // 새로 추가
  // ...
};
```

2. HTML에 언어 버튼 추가:

```html
<button class="lang-btn" data-lang="ja" onclick="switchLanguage('ja')">
  日本語
</button>
```

3. **끝!** 추가 파일 필요 없음

## 📁 프로젝트 구조

```
excel-wizard/
├── index.html              # 메인 페이지 (완전한 i18n 통합)
├── CNAME                   # GitHub Pages 커스텀 도메인
├── README.md               # 프로젝트 문서
│
├── i18n/                   # 다국어 시스템
│   ├── translations.js     # 모든 언어 번역 데이터
│   └── i18n.js            # 다국어 엔진
│
├── css/                    # 스타일시트
│   ├── main.css           # 메인 스타일
│   ├── diagram.css        # 도식 설명 스타일
│   └── *.css              # 각 도구별 스타일
│
├── js/                     # JavaScript
│   ├── app.js             # 메인 앱 로직
│   └── tools/             # 각 도구별 로직
│       ├── merge-tool.js
│       ├── sheet-creator.js
│       ├── table-organizer.js
│       └── sheet-selector.js
│
├── shared/                 # 공통 리소스
│   ├── favicon.ico
│   └── images/
│
└── demo/                   # 데모 및 테스트 파일
    └── demo-i18n.html     # i18n 시스템 테스트 페이지
```

## 🛠️ 사용된 도구

### 1. 데이터 병합 (Data Merge)

동일한 구조의 여러 엑셀 파일을 하나의 시트로 병합

### 2. 시트 생성기 (Sheet Creator)

입력한 텍스트로 여러 시트가 있는 엑셀 파일 생성

### 3. 표 정리 (Table Organizer)

세로 나열된 데이터를 표 형태로 정리

### 4. 시트 선택 병합 (Sheet Selector)

여러 파일에서 원하는 시트만 선택하여 병합

## 🚀 배포

### GitHub Pages

- URL: https://excelwizard.help
- 커스텀 도메인 설정 완료
- 캐시 무효화 메타태그 적용
- Plausible Analytics 통합

### 캐시 관리

- Cache-Control 헤더 설정
- CSS/JS 파일 버전 관리 (`?v=1.5`)
- 브라우저 캐싱 문제 해결

## 🔧 개발

### 언어 전환 테스트

1. `demo/demo-i18n.html` 열기
2. 언어 버튼 클릭하여 실시간 번역 확인

### 번역 추가

- `i18n/translations.js`에서 번역 데이터 관리
- `data-i18n="번역키"` 속성으로 HTML 요소에 적용
- `window.t('번역키')` 함수로 JavaScript에서 사용

## 🌟 주요 장점

✅ **단일 HTML 파일**: 유지보수 간편  
✅ **즉시 언어 전환**: 페이지 새로고침 없음  
✅ **SEO 최적화**: 메타태그 자동 번역  
✅ **무제한 언어 확장**: 새 언어 추가 용이  
✅ **캐시 효율성**: 브라우저 캐싱 최적화

## 📝 라이선스

© 2024 Excel Wizard. All rights reserved.
