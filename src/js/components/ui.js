// UI関連の機能をまとめたモジュール

// メニュートグルの初期化
function initMenuToggle() {
    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuButton || !navLinks) {
        console.warn('Menu elements not found');
        return;
    }

    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuButton.setAttribute('aria-expanded', 
            navLinks.classList.contains('active').toString()
        );
    });

    // 画面外クリックでメニューを閉じる
    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
}

// 画像の遅延読み込み
export function initLazyLoading() {
    console.log('Initializing lazy loading...');

    if ('loading' in HTMLImageElement.prototype) {
        // ネイティブの遅延読み込みをサポートしている場合
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            console.log(`Setting up lazy loading for: ${img.src}`);
        });
    } else {
        // フォールバックの実装（必要に応じて）
        console.log('Native lazy loading not supported, using fallback');
    }
}

// メイン UI の初期化
export function initUI() {
    console.log('Initializing UI components...');

    // メニュートグルの初期化
    initMenuToggle();
    console.log('Menu toggle initialized');

    // アクセシビリティ対応
    setupAccessibility();
    console.log('Accessibility features initialized');

    // 言語切り替え時のUIアップデート
    window.addEventListener('languageChanged', (e) => {
        console.log(`UI update triggered by language change to: ${e.detail.language}`);
        updateUIForLanguage(e.detail.language);
    });
}

// アクセシビリティ設定
function setupAccessibility() {
    // 言語切り替えボタンのARIA属性設定
    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.setAttribute('role', 'button');
        button.setAttribute('aria-pressed', 
            button.classList.contains('active').toString()
        );
    });

    // メニューボタンのARIA属性設定
    const menuButton = document.querySelector('.menu-toggle');
    if (menuButton) {
        menuButton.setAttribute('aria-label', 'メニュー');
        menuButton.setAttribute('aria-expanded', 'false');
    }
}

// 言語変更時のUI更新
function updateUIForLanguage(lang) {
    // 方向性の設定（必要に応じて）
    document.documentElement.dir = ['ar', 'he', 'fa'].includes(lang) ? 'rtl' : 'ltr';

    // フォントファミリーの更新（必要に応じて）
    const fontFamilies = {
        ja: '"游明朝", YuMincho, "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif',
        zh: '"Microsoft YaHei", "微软雅黑", "SimSun", "宋体", sans-serif',
        en: '"Times New Roman", serif'
    };

    if (fontFamilies[lang]) {
        document.body.style.fontFamily = fontFamilies[lang];
    }

    // その他のUI要素の更新（必要に応じて）
    console.log(`UI updated for language: ${lang}`);
}