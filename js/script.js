
/**
 * 生成AI講座 ランディングページ - スクリプト
 */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer の設定
  const observerOptions = {
    root: null, // ビューポートをルートとする
    rootMargin: '0px',
    threshold: 0.1 // 要素が10%見えたらコールバックを実行
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // 要素が交差ルートに入った（画面に現れた）場合
      if (entry.isIntersecting) {
        // is-visible クラスを付与してアニメーションを開始
        entry.target.classList.add('is-visible');
        
        // アニメーション後は監視を解除（一度だけ実行）
        observer.unobserve(entry.target);
      }
    });
  };

  // オブザーバーのインスタンスを生成
  const fadeObserver = new IntersectionObserver(observerCallback, observerOptions);

  // js-fade-up クラスを持つすべての要素を取得し、監視の対象に追加
  const fadeElements = document.querySelectorAll('.js-fade-up');
  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // (オプション) カード型要素などを時間差で順番に表示するための処理
  // 必要であれば .examples-grid 内の .example-card に適用
  const staggerContainers = document.querySelectorAll('.solution-grid, .examples-grid, .tools-grid');
  
  staggerContainers.forEach(container => {
    const children = Array.from(container.children);
    
    // 子要素に順番に delay を設定
    children.forEach((child, index) => {
      // 親コンテナではなく子要素自体に js-fade-up クラスがある場合はそこに delay を当てても良い
      // ここでは、子要素自体が js-fade-up であるか、または親が js-fade-up であるかに応じて対応
      if (child.classList.contains('js-fade-up')) {
          child.style.transitionDelay = `${index * 0.15}s`;
      } else {
        // 今回のHTML構造ではセクション全体(.js-fade-up)を親としているが
        // 子要素も個別にトランジションを持つ場合はここで制御可能
      }
    });
  });

  // ----------------------------------------------------
  // トップに戻るボタンの制御
  // ----------------------------------------------------
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (backToTopBtn) {
    // スクロール時のフェードイン・フェードアウト制御
    window.addEventListener('scroll', () => {
      // 300px以上スクロールしたら表示
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('is-show');
      } else {
        backToTopBtn.classList.remove('is-show');
      }
    });

    // クリック時のスムーズスクロール（CSSのscroll-behaviorのサポート用・確実な処理）
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
