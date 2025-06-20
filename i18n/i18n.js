/**
 * Excel Wizard - 다국어 지원 모듈
 * JavaScript 기반 i18n 시스템
 */

class I18n {
  constructor() {
    this.currentLanguage = "ko"; // 기본값
    this.fallbackLanguage = "en";
    this.translations = window.translations || {};
    this.supportedLanguages = Object.keys(this.translations);

    // 언어 감지 및 초기화
    this.init();
  }

  /**
   * 초기화 - 언어 감지 및 설정
   */
  init() {
    const savedLanguage = this.getSavedLanguage();
    const browserLanguage = this.detectBrowserLanguage();

    // URL 파라미터에서 언어 확인
    const urlParams = new URLSearchParams(window.location.search);
    const urlLanguage = urlParams.get("lang");

    // 우선순위: URL 파라미터 > 저장된 언어 > 브라우저 언어 > 기본값(한국어)
    if (urlLanguage && this.isLanguageSupported(urlLanguage)) {
      this.currentLanguage = urlLanguage;
    } else if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else if (this.isLanguageSupported(browserLanguage)) {
      this.currentLanguage = browserLanguage;
    } else {
      this.currentLanguage = "ko"; // 기본값
    }

    console.log(`[i18n] Initialized with language: ${this.currentLanguage}`);
    console.log(`[i18n] Available languages:`, this.supportedLanguages);
    console.log(`[i18n] Browser language:`, browserLanguage);
    console.log(`[i18n] Saved language:`, savedLanguage);
    console.log(`[i18n] URL language:`, urlLanguage);
  }

  /**
   * 브라우저 언어 감지
   */
  detectBrowserLanguage() {
    const language = navigator.language || navigator.userLanguage || "ko";
    return language.split("-")[0]; // 'ko-KR' -> 'ko'
  }

  /**
   * 저장된 언어 가져오기
   */
  getSavedLanguage() {
    // 쿠키에서 가져오기
    const cookieValue = this.getCookie("preferred-language");
    if (cookieValue) return cookieValue;

    // localStorage에서 가져오기 (백업)
    return localStorage.getItem("excel-wizard-language");
  }

  /**
   * 언어 저장
   */
  saveLanguage(language) {
    // 쿠키에 저장 (1년)
    document.cookie = `preferred-language=${language}; path=/; max-age=31536000`;

    // localStorage에도 저장 (백업)
    localStorage.setItem("excel-wizard-language", language);
  }

  /**
   * 쿠키 값 가져오기
   */
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  /**
   * 언어 지원 여부 확인
   */
  isLanguageSupported(language) {
    return this.supportedLanguages.includes(language);
  }

  /**
   * 현재 언어 가져오기
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * 언어 변경
   */
  setLanguage(language) {
    if (!this.isLanguageSupported(language)) {
      console.warn(`[i18n] Language '${language}' is not supported`);
      return false;
    }

    this.currentLanguage = language;
    this.saveLanguage(language);

    // 페이지 번역 업데이트
    this.updatePage();

    // 언어 변경 이벤트 발생
    document.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: { language: language },
      })
    );

    console.log(`[i18n] Language changed to: ${language}`);
    return true;
  }

  /**
   * 번역 텍스트 가져오기
   * @param {string} key - 번역 키 (예: 'header.title')
   * @param {object} params - 치환할 매개변수 (선택사항)
   */
  t(key, params = {}) {
    const keys = key.split(".");
    let translation = this.translations[this.currentLanguage];

    // 현재 언어에서 키 탐색
    for (const k of keys) {
      if (translation && typeof translation === "object" && k in translation) {
        translation = translation[k];
      } else {
        translation = null;
        break;
      }
    }

    // 현재 언어에서 찾지 못한 경우 fallback 언어 사용
    if (translation === null || translation === undefined) {
      translation = this.translations[this.fallbackLanguage];
      for (const k of keys) {
        if (
          translation &&
          typeof translation === "object" &&
          k in translation
        ) {
          translation = translation[k];
        } else {
          translation = key; // 키 자체를 반환 (개발 시 디버깅용)
          break;
        }
      }
    }

    // 매개변수 치환
    if (typeof translation === "string" && Object.keys(params).length > 0) {
      translation = translation.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match;
      });
    }

    return translation || key;
  }

  /**
   * 페이지의 모든 번역 가능한 요소 업데이트
   */
  updatePage() {
    // data-i18n 속성을 가진 모든 요소 찾기
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translatedText = this.t(key);

      // HTML이 포함된 경우 innerHTML 사용, 아니면 textContent 사용
      if (translatedText.includes("<") || translatedText.includes("&")) {
        element.innerHTML = translatedText;
      } else {
        element.textContent = translatedText;
      }
    });

    // data-i18n-placeholder 속성을 가진 입력 요소
    const placeholderElements = document.querySelectorAll(
      "[data-i18n-placeholder]"
    );
    placeholderElements.forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      element.placeholder = this.t(key);
    });

    // data-i18n-title 속성을 가진 요소
    const titleElements = document.querySelectorAll("[data-i18n-title]");
    titleElements.forEach((element) => {
      const key = element.getAttribute("data-i18n-title");
      element.title = this.t(key);
    });

    // data-i18n-content 속성을 가진 메타 태그
    const contentElements = document.querySelectorAll("[data-i18n-content]");
    contentElements.forEach((element) => {
      const key = element.getAttribute("data-i18n-content");
      element.setAttribute("content", this.t(key));
    });

    // 메타 태그 업데이트
    this.updateMetaTags();

    // 구조화된 데이터 업데이트
    this.updateStructuredData();

    // 언어 선택 버튼 상태 업데이트
    this.updateLanguageButtons();
  }

  /**
   * 메타 태그 업데이트
   */
  updateMetaTags() {
    // 페이지 제목
    const titleElement = document.querySelector("title");
    if (titleElement) {
      titleElement.textContent = this.t("meta.title");
    }

    // 메타 description
    const descriptionElement = document.querySelector(
      'meta[name="description"]'
    );
    if (descriptionElement) {
      descriptionElement.setAttribute("content", this.t("meta.description"));
    }

    // 메타 keywords
    const keywordsElement = document.querySelector('meta[name="keywords"]');
    if (keywordsElement) {
      keywordsElement.setAttribute("content", this.t("meta.keywords"));
    }
  }

  /**
   * 구조화된 데이터 업데이트
   */
  updateStructuredData() {
    const structuredDataElement = document.getElementById("structured-data");
    if (structuredDataElement) {
      try {
        const structuredData = JSON.parse(structuredDataElement.textContent);
        structuredData.description = this.t("meta.description");
        structuredData.inLanguage =
          this.currentLanguage === "ko" ? "ko-KR" : "en-US";
        structuredDataElement.textContent = JSON.stringify(
          structuredData,
          null,
          2
        );
      } catch (e) {
        console.warn("[i18n] Failed to update structured data:", e);
      }
    }
  }

  /**
   * 언어 선택 버튼 상태 업데이트
   */
  updateLanguageButtons() {
    const languageButtons = document.querySelectorAll(".lang-btn");
    languageButtons.forEach((button) => {
      const buttonLang = button.getAttribute("data-lang");
      if (buttonLang === this.currentLanguage) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  /**
   * 지원되는 언어 목록 가져오기
   */
  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  /**
   * 언어별 메타데이터 가져오기
   */
  getLanguageInfo() {
    const languageNames = {
      ko: "한국어",
      en: "English",
      ja: "日本語",
      zh: "中文",
      es: "Español",
      fr: "Français",
      de: "Deutsch",
      it: "Italiano",
      pt: "Português",
      ru: "Русский",
    };

    return this.supportedLanguages.map((lang) => ({
      code: lang,
      name: languageNames[lang] || lang.toUpperCase(),
      isActive: lang === this.currentLanguage,
    }));
  }
}

// 전역 i18n 인스턴스 생성
window.i18n = new I18n();

// 전역 번역 함수 (단축키)
window.t = function (key, params) {
  return window.i18n.t(key, params);
};

// DOM 로드 완료 시 페이지 번역
document.addEventListener("DOMContentLoaded", function () {
  if (window.i18n) {
    window.i18n.updatePage();
  }
});

console.log("[i18n] Module loaded successfully");
