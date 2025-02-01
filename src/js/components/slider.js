// スライダーの実装
export function initSlider() {
    console.log('Initializing slider component...');

    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length === 0) {
        console.warn('No slides found');
        return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;
    console.log(`Found ${totalSlides} slides`);

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // 自動スライド切り替えの設定
    const interval = setInterval(nextSlide, 5000);

    // スライダーのクリーンアップ関数
    function cleanup() {
        clearInterval(interval);
    }

    // ページ遷移時にクリーンアップ
    window.addEventListener('unload', cleanup);

    // 初期表示
    showSlide(currentSlide);
    console.log('Slider initialized successfully');

    // クリーンアップ関数を返す（必要に応じて使用）
    return cleanup;
}