/* ============================================
   BLUE HERON — App Logic
   ============================================ */

(function() {
  'use strict';

  // ---- PRODUCTS DATA ----
  const products = [
    {
      id: 1,
      name: 'The Gentleman Butler',
      subtitle: 'Skeleton Butler',
      category: 'halloween',
      price: 149.99,
      image: './assets/product_skeleton.png',
      description: 'Life-size animated skeleton butler with LED eyes, moving jaw, and candy tray. Motion-activated with 3 spooky phrases. 4ft tall.',
      specs: ['4ft tall', 'LED eyes', 'Motion-activated', '3 spooky phrases', 'Candy tray included', 'Indoor/outdoor']
    },
    {
      id: 2,
      name: 'Shadow Cat',
      subtitle: 'Black Cat',
      category: 'halloween',
      price: 79.99,
      image: './assets/product_cat.png',
      description: 'Animated black cat with arched back, glowing green LED eyes, and moving head. Realistic fur with hissing sound effects. 18 inches.',
      specs: ['18 inches', 'LED green eyes', 'Moving head', 'Realistic fur', 'Hissing sounds', 'Battery powered']
    },
    {
      id: 3,
      name: 'The Sorceress',
      subtitle: 'Animated Witch',
      category: 'halloween',
      price: 199.99,
      image: './assets/hero_halloween.png',
      description: '5ft animated witch with moving arms, glowing eyes, and spell book. LED crystal ball effect. Motion-activated with 5 phrases.',
      specs: ['5ft tall', 'Moving arms', 'Crystal ball LED', '5 phrases', 'Spell book prop', 'Motion sensor']
    },
    {
      id: 4,
      name: 'Grave Keeper',
      subtitle: 'Animated Groundbreaker',
      category: 'halloween',
      price: 129.99,
      image: './assets/product_skeleton.png',
      description: '3ft animated groundbreaker with emerging torso, LED eyes, and howling sounds. Weatherproof outdoor design.',
      specs: ['3ft tall', 'LED eyes', 'Howling sounds', 'Weatherproof', 'Ground stakes', 'AC powered']
    },
    {
      id: 5,
      name: 'Father Christmas',
      subtitle: 'Premium Animated Santa',
      category: 'christmas',
      price: 249.99,
      image: './assets/hero_christmas.png',
      description: '3ft premium animated Santa with moving arms and head, holding lantern with warm LED glow. Hand-painted face, velvet outfit.',
      specs: ['3ft tall', 'Moving arms & head', 'LED lantern', 'Hand-painted', 'Velvet outfit', 'UL certified']
    },
    {
      id: 6,
      name: 'The Royal Guard',
      subtitle: 'Animated Nutcracker',
      category: 'christmas',
      price: 179.99,
      image: './assets/product_nutcracker.png',
      description: '3ft animated nutcracker with moving arms and jaw. Hand-painted in traditional red and gold. Musical box plays 3 holiday tunes.',
      specs: ['3ft tall', 'Moving jaw & arms', '3 holiday tunes', 'Hand-painted', 'Red & gold finish', 'Musical box']
    },
    {
      id: 7,
      name: 'Dasher',
      subtitle: 'Animated Reindeer',
      category: 'christmas',
      price: 199.99,
      image: './assets/product_reindeer.png',
      description: '2.5ft animated reindeer with moving head, LED antlers, and gold bell harness. Realistic faux fur with festive saddle.',
      specs: ['2.5ft tall', 'LED antlers', 'Moving head', 'Faux fur', 'Gold bell harness', 'Festive saddle']
    },
    {
      id: 8,
      name: 'Workshop Elf',
      subtitle: 'Animated Elf',
      category: 'christmas',
      price: 89.99,
      image: './assets/product_nutcracker.png',
      description: '2ft animated elf with moving arms, building toys. LED workshop bench included. Plays 3 cheerful sound clips.',
      specs: ['2ft tall', 'Moving arms', 'LED bench', '3 sound clips', 'Workshop scene', 'Battery powered']
    }
  ];

  // ---- CART STATE ----
  let cart = [];

  // ---- DOM REFS ----
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ---- DARK MODE TOGGLE ----
  function initTheme() {
    const toggles = $$('[data-theme-toggle], [data-theme-toggle-mobile]');
    const html = document.documentElement;
    let theme = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    toggles.forEach(t => updateThemeIcon(t, theme));

    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', theme);
        toggles.forEach(t => {
          updateThemeIcon(t, theme);
          t.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
        });
      });
    });
  }

  function updateThemeIcon(btn, theme) {
    if (theme === 'dark') {
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    } else {
      btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  // ---- HERO SLIDER ----
  function initHero() {
    const slides = $$('.hero-slide');
    const dots = $$('.hero-dot');
    let current = 0;
    let interval;

    function goToSlide(i) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[i].classList.add('active');
      dots[i].classList.add('active');
      current = i;
    }

    function next() {
      goToSlide((current + 1) % slides.length);
    }

    function startAuto() {
      interval = setInterval(next, 6000);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(interval);
        goToSlide(i);
        startAuto();
      });
    });

    goToSlide(0);
    startAuto();
  }

  // ---- RENDER PRODUCTS ----
  function renderProducts(filter = 'all') {
    const grid = $('#product-grid');
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    grid.innerHTML = filtered.map((p, i) => `
      <div class="product-card reveal reveal-delay-${(i % 4) + 1}" data-id="${p.id}" role="button" tabindex="0">
        <div class="product-card-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy" width="400" height="400">
          <span class="product-card-category">${p.category}</span>
          <button class="product-card-quick" data-quickview="${p.id}" aria-label="Quick view ${p.name}">Quick View</button>
        </div>
        <div class="product-card-body">
          <h3 class="product-card-name">${p.name}</h3>
          <p class="product-card-desc">${p.description}</p>
          <div class="product-card-footer">
            <span class="product-card-price">$${p.price.toFixed(2)}</span>
            <button class="btn-add-cart" data-add="${p.id}" aria-label="Add ${p.name} to cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Re-attach events
    attachProductEvents();
    // Trigger reveal
    requestAnimationFrame(() => {
      grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    });
  }

  function attachProductEvents() {
    $$('.btn-add-cart[data-add]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.add);
        addToCart(id);
        btn.classList.add('added');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
        setTimeout(() => {
          btn.classList.remove('added');
          btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>';
        }, 1200);
      });
    });

    $$('.product-card-quick').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(parseInt(btn.dataset.quickview));
      });
    });

    $$('.product-card[data-id]').forEach(card => {
      card.addEventListener('click', () => {
        openModal(parseInt(card.dataset.id));
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(parseInt(card.dataset.id));
        }
      });
    });
  }

  // ---- FILTERING ----
  function initFilters() {
    const filterBtns = $$('.filter-btn');
    const collectionCards = $$('.collection-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        renderProducts(filter);
        // Also update collection card active state
        collectionCards.forEach(c => c.classList.remove('active'));
        if (filter !== 'all') {
          const matchCard = document.querySelector(`.collection-card[data-category="${filter}"]`);
          if (matchCard) matchCard.classList.add('active');
        }
      });
    });

    collectionCards.forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.dataset.category;
        // Set filter
        filterBtns.forEach(b => b.classList.remove('active'));
        const matchBtn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
        if (matchBtn) matchBtn.classList.add('active');
        collectionCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        renderProducts(cat);
        // Scroll to products
        document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ---- CART LOGIC ----
  function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, qty: 1 });
    }
    updateCartUI();
    // Pop animation on cart icon
    const badge = $('.cart-badge');
    const cartIcon = $('#cart-btn');
    cartIcon.classList.remove('cart-pop');
    void cartIcon.offsetWidth;
    cartIcon.classList.add('cart-pop');
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
  }

  function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        removeFromCart(id);
        return;
      }
    }
    updateCartUI();
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  }

  function getCartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function updateCartUI() {
    // Badge (both desktop and mobile)
    const badges = $$('.cart-badge');
    const count = getCartCount();
    badges.forEach(badge => {
      badge.textContent = count;
      badge.classList.toggle('visible', count > 0);
    });

    // Drawer items
    renderCartItems();
  }

  function renderCartItems() {
    const container = $('.cart-items');
    const footer = $('.cart-footer');

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p class="cart-empty-text">Your cart is empty</p>
          <p class="cart-empty-sub">Browse our collections to find something special</p>
        </div>
      `;
      footer.style.display = 'none';
      return;
    }

    footer.style.display = 'block';

    container.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) return '';
      return `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${product.image}" alt="${product.name}" width="80" height="80">
          </div>
          <div class="cart-item-info">
            <p class="cart-item-name">${product.name}</p>
            <p class="cart-item-price">$${product.price.toFixed(2)}</p>
            <div class="cart-item-controls">
              <button class="qty-btn" data-qty-minus="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="cart-item-qty">${item.qty}</span>
              <button class="qty-btn" data-qty-plus="${item.id}" aria-label="Increase quantity">+</button>
              <button class="cart-item-remove" data-remove="${item.id}" aria-label="Remove ${product.name}">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Total
    $('.cart-total-value').textContent = '$' + getCartTotal().toFixed(2);

    // Events
    container.querySelectorAll('[data-qty-minus]').forEach(btn => {
      btn.addEventListener('click', () => updateQty(parseInt(btn.dataset.qtyMinus), -1));
    });
    container.querySelectorAll('[data-qty-plus]').forEach(btn => {
      btn.addEventListener('click', () => updateQty(parseInt(btn.dataset.qtyPlus), 1));
    });
    container.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.remove)));
    });
  }

  // ---- CART DRAWER ----
  function initCart() {
    const cartBtns = $$('#cart-btn, .mobile-cart-btn');
    const overlay = $('.cart-overlay');
    const drawer = $('.cart-drawer');
    const closeBtn = $('.cart-close');

    function openCart() {
      overlay.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeCart() {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }

    cartBtns.forEach(btn => btn.addEventListener('click', openCart));
    overlay.addEventListener('click', closeCart);
    closeBtn.addEventListener('click', closeCart);

    // Checkout
    $('.btn-checkout').addEventListener('click', () => {
      if (cart.length === 0) return;
      closeCart();
      showToast();
      cart = [];
      updateCartUI();
    });
  }

  function showToast() {
    const toast = $('.toast');
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 4000);
  }

  // ---- PRODUCT MODAL ----
  function openModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const overlay = $('.modal-overlay');
    const modal = overlay.querySelector('.modal');

    modal.querySelector('.modal-img img').src = product.image;
    modal.querySelector('.modal-img img').alt = product.name;
    modal.querySelector('.modal-category').textContent = product.category.toUpperCase() + ' COLLECTION';
    modal.querySelector('.modal-title').textContent = product.name;
    modal.querySelector('.modal-desc').textContent = product.description;
    modal.querySelector('.modal-price').textContent = '$' + product.price.toFixed(2);

    const specsEl = modal.querySelector('.modal-specs');
    specsEl.innerHTML = product.specs.map(s => `
      <div class="modal-spec">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
        <span>${s}</span>
      </div>
    `).join('');

    const addBtn = modal.querySelector('.btn-modal-cart');
    addBtn.onclick = () => {
      addToCart(id);
      addBtn.textContent = 'Added to Cart ✓';
      addBtn.style.background = 'var(--color-success)';
      setTimeout(() => {
        addBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart';
        addBtn.style.background = '';
      }, 1500);
    };

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function initModal() {
    const overlay = $('.modal-overlay');
    const closeBtn = overlay.querySelector('.modal-close');

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        // Also close cart if open
        $('.cart-overlay').classList.remove('open');
        $('.cart-drawer').classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- NEWSLETTER ----
  function initNewsletter() {
    const form = $('#newsletter-form');
    const success = $('.newsletter-success');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input').value;
      if (email) {
        success.classList.add('visible');
        form.querySelector('input').value = '';
        setTimeout(() => success.classList.remove('visible'), 5000);
      }
    });
  }

  // ---- MOBILE NAV ----
  function initMobileNav() {
    const toggle = $('.nav-mobile-toggle');
    const nav = $('.nav-mobile');

    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      toggle.innerHTML = isOpen
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });
  }

  // ---- SMOOTH SCROLL NAV ----
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ---- SCROLL REVEAL ----
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal').forEach(el => observer.observe(el));
  }

  // ---- INIT ----
  function init() {
    initTheme();
    initHero();
    renderProducts('all');
    initFilters();
    initCart();
    initModal();
    initNewsletter();
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    updateCartUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
