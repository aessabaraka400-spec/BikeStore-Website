const toast = document.getElementById("toast");
const topOffer = document.querySelector(".top-offer");
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".main-nav a");
let lastScrollY = window.scrollY;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function syncTopOfferHeight() {
  if (!topOffer) return;
  document.documentElement.style.setProperty("--top-offer-height", `${topOffer.offsetHeight}px`);
}

function handleHeaderOnScroll() {
  if (!siteHeader) return;

  if (window.scrollY <= 12) {
    siteHeader.classList.remove("header-hidden");
    lastScrollY = window.scrollY;
    return;
  }

  siteHeader.classList.toggle("header-hidden", window.scrollY > lastScrollY);
  lastScrollY = window.scrollY;
}

function setupHeader() {
  syncTopOfferHeight();
  handleHeaderOnScroll();
  window.addEventListener("resize", syncTopOfferHeight);
  window.addEventListener("load", syncTopOfferHeight);
  window.addEventListener("scroll", handleHeaderOnScroll, { passive: true });
}

function setActiveNav(activeLink) {
  navLinks.forEach((link) => link.classList.toggle("active", link === activeLink));
}

function setupActiveNavigation() {
  const pageName = window.location.pathname.split("/").pop() || "index.html";
  const pageLink = Array.from(navLinks).find((link) => {
    const href = link.getAttribute("href");
    return href && !href.startsWith("#") && href.split("#")[0] === pageName;
  });
  const hashLink = Array.from(navLinks).find((link) => link.getAttribute("href") === window.location.hash);

  if (pageLink || hashLink) setActiveNav(hashLink || pageLink);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setActiveNav(link));
  });
}

function setupTestimonials() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const prev = document.querySelector(".testimonial-prev");
  const next = document.querySelector(".testimonial-next");
  let index = 0;

  function showSlide(nextIndex) {
    if (!slides.length) return;
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });
  }

  prev?.addEventListener("click", () => showSlide(index - 1));
  next?.addEventListener("click", () => showSlide(index + 1));
  showSlide(0);
}

function setupHeroParallax() {
  const heroMedia = document.querySelector(".hero-media");
  const heroBike = document.getElementById("hero-bike");
  if (!heroMedia || !heroBike) return;

  heroMedia.addEventListener("mousemove", (event) => {
    const rect = heroMedia.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroBike.style.setProperty("--mouse-x", `${x * 28}px`);
    heroBike.style.setProperty("--mouse-y", `${y * 22}px`);
  });

  heroMedia.addEventListener("mouseleave", () => {
    heroBike.style.setProperty("--mouse-x", "0px");
    heroBike.style.setProperty("--mouse-y", "0px");
  });
}

function setupAboutParallax() {
  const aboutMedia = document.querySelector(".about-media");
  const aboutImage = aboutMedia?.querySelector("img");
  if (!aboutMedia || !aboutImage) return;

  aboutMedia.addEventListener("mousemove", (event) => {
    const rect = aboutMedia.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    aboutImage.style.setProperty("--about-x", `${x * 12}px`);
    aboutImage.style.setProperty("--about-y", `${y * 10}px`);
  });

  aboutMedia.addEventListener("mouseleave", () => {
    aboutImage.style.setProperty("--about-x", "0px");
    aboutImage.style.setProperty("--about-y", "0px");
  });
}

function setupPackageTilt() {
  document.querySelectorAll(".packages article").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty("--tilt-x", `${y * -9}deg`);
      card.style.setProperty("--tilt-y", `${x * 11}deg`);
      card.style.setProperty("--shift-x", `${x * 12}px`);
      card.style.setProperty("--shift-y", `${y * 10}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--shift-x", "0px");
      card.style.setProperty("--shift-y", "0px");
    });
  });
}

function setupCartButtons() {
  document.querySelectorAll(".cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.product || "Product";
      showToast(`${productName} has been added to your cart.`);
    });
  });
}

function setupForms() {
  document.querySelector(".newsletter")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Thanks for joining. New bike offers are on the way.");
    event.currentTarget.reset();
  });

  document.querySelector(".blog-search-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Search is ready for the blog archive.");
  });

  document.querySelector(".faq-ask-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Your question has been sent.");
    event.currentTarget.reset();
  });

  document.querySelector(".contact-page-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Your message has been sent.");
    event.currentTarget.reset();
  });
}

function setupServiceFaq() {
  const items = document.querySelectorAll(".service-faq-item");

  items.forEach((item) => {
    const question = item.querySelector(".service-faq-question");
    question?.addEventListener("click", () => {
      items.forEach((faqItem) => {
        const isActive = faqItem === item;
        faqItem.classList.toggle("active", isActive);
        faqItem.querySelector(".service-faq-question")?.setAttribute("aria-expanded", String(isActive));
      });
    });
  });
}

function setupFaqAccordion() {
  document.querySelectorAll(".faq-accordion-item").forEach((item) => {
    const question = item.querySelector(".faq-accordion-question");
    question?.addEventListener("click", () => {
      const willOpen = !item.classList.contains("active");
      item.classList.toggle("active", willOpen);
      question.setAttribute("aria-expanded", String(willOpen));
    });
  });
}

function setupShopPagination() {
  const grid = document.getElementById("shop-products");
  const buttons = document.querySelectorAll("[data-shop-target]");
  const products = document.querySelectorAll(".product-card[data-shop-page]");
  let currentPage = "main";

  function showProducts(page) {
    if (!grid || !products.length) return;

    currentPage = page;
    products.forEach((product) => {
      product.hidden = product.dataset.shopPage !== currentPage;
    });

    grid.classList.toggle("showing-extra", currentPage === "extra");
    buttons.forEach((button) => {
      button.classList.toggle("active", button.dataset.shopTarget === currentPage);
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.shopTarget;
      showProducts(target === "next" ? (currentPage === "main" ? "extra" : "main") : target);
    });
  });

  showProducts("main");
}

function setupScrollTop() {
  document.querySelectorAll(".scroll-top").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

setupHeader();
setupActiveNavigation();
setupTestimonials();
setupHeroParallax();
setupAboutParallax();
setupPackageTilt();
setupCartButtons();
setupForms();
setupServiceFaq();
setupFaqAccordion();
setupShopPagination();
setupScrollTop();
