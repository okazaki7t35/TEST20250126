// メインアプリケーションの初期化
import { initSlider } from './components/slider.js';
import { initLanguageSwitcher } from './features/i18n.js';
import { initUI, initLazyLoading } from './components/ui.js';

// 初期化関数
async function initializeApp() {
    try {
        // 言語切り替え機能の初期化（最初に実行）
        console.log('Initializing language switcher...');
        await initLanguageSwitcher();
        console.log('Language switcher initialized');

        // その他の機能を初期化
        if (document.querySelector('.hero-slider')) {
            console.log('Initializing slider...');
            initSlider();
        }

        console.log('Initializing UI...');
        initUI();

        console.log('Initializing lazy loading...');
        initLazyLoading();

        // 初期化完了後にイベントをディスパッチ
        window.dispatchEvent(new CustomEvent('appInitialized'));
        console.log('All features initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

// 即時実行関数でアプリを初期化
(async function() {
    // DOMContentLoadedを待つ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM Content Loaded');
            initializeApp();
        });
    } else {
        // DOMがすでに読み込まれている場合は直接実行
        console.log('DOM already loaded, initializing...');
        initializeApp();
    }
})();

// Service Workerの登録（オフライン対応）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.error('ServiceWorker registration failed:', err);
        });
    });
}