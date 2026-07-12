const form = document.querySelector("#inviteForm");
const title = document.querySelector("#previewTitle");
const body = document.querySelector("#previewBody");
const whatsappLink = document.querySelector("#leadWhatsappLink");
const heroOrbit = document.querySelector("[data-hero-orbit]");
const orbitButtons = heroOrbit ? Array.from(heroOrbit.querySelectorAll("[data-orbit-action]")) : [];
const carouselModal = document.querySelector("#eventCarouselModal");
const carouselOpenButton = document.querySelector("[data-carousel-open]");
const carouselCloseButtons = carouselModal ? Array.from(carouselModal.querySelectorAll("[data-carousel-close]")) : [];
const carouselSlides = carouselModal ? Array.from(carouselModal.querySelectorAll(".carousel-slide")) : [];
const carouselDots = carouselModal ? Array.from(carouselModal.querySelectorAll("[data-carousel-dot]")) : [];
const carouselPrev = carouselModal ? carouselModal.querySelector("[data-carousel-prev]") : null;
const carouselNext = carouselModal ? carouselModal.querySelector("[data-carousel-next]") : null;
let carouselIndex = 0;

if (form && title && body && whatsappLink) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#nameInput").value.trim() || "A new visitor";
    const contact = document.querySelector("#contactInput").value.trim() || "Not provided yet";
    const interest = document.querySelector("#interestInput").value;
    const message =
      document.querySelector("#messageInput").value.trim() ||
      "I would like to know the next session date, location, and how to join.";

    const leadMessage = `Hi Founders Club, I would like to request more information.\n\nName: ${name}\nContact: ${contact}\nInterested in: ${interest}\nQuestion: ${message}`;

    title.textContent = `${name} - ${interest}`;
    body.textContent = `Contact: ${contact}. Question: ${message}`;
    whatsappLink.href = `https://wa.me/60104675275?text=${encodeURIComponent(leadMessage)}`;
  });
}

if (heroOrbit && orbitButtons.length) {
  const setFocus = (focus) => {
    if (focus === "reset") {
      heroOrbit.removeAttribute("data-focus");
    } else {
      heroOrbit.dataset.focus = focus;
    }

    orbitButtons.forEach((button) => {
      const action = button.dataset.orbitAction;
      button.classList.toggle("is-active", action === focus || (focus === "reset" && action === "connect"));
    });
  };

  orbitButtons.forEach((button) => {
    button.addEventListener("click", () => setFocus(button.dataset.orbitAction));
  });

  heroOrbit.addEventListener("pointermove", (event) => {
    const bounds = heroOrbit.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroOrbit.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
    heroOrbit.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
  });

  heroOrbit.addEventListener("pointerleave", () => {
    heroOrbit.style.setProperty("--tilt-x", "0deg");
    heroOrbit.style.setProperty("--tilt-y", "0deg");
  });
}

if (carouselModal && carouselOpenButton && carouselSlides.length) {
  const showSlide = (index) => {
    carouselIndex = (index + carouselSlides.length) % carouselSlides.length;

    carouselSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === carouselIndex);
    });

    carouselDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === carouselIndex);
    });
  };

  const openCarousel = () => {
    carouselModal.classList.add("is-open");
    carouselModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    showSlide(carouselIndex);
    carouselNext?.focus();
  };

  const closeCarousel = () => {
    carouselModal.classList.remove("is-open");
    carouselModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    carouselOpenButton.focus();
  };

  carouselOpenButton.addEventListener("click", openCarousel);

  carouselCloseButtons.forEach((button) => {
    button.addEventListener("click", closeCarousel);
  });

  carouselPrev?.addEventListener("click", () => showSlide(carouselIndex - 1));
  carouselNext?.addEventListener("click", () => showSlide(carouselIndex + 1));

  carouselDots.forEach((dot) => {
    dot.addEventListener("click", () => showSlide(Number(dot.dataset.carouselDot)));
  });

  document.addEventListener("keydown", (event) => {
    if (!carouselModal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeCarousel();
    }

    if (event.key === "ArrowLeft") {
      showSlide(carouselIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showSlide(carouselIndex + 1);
    }
  });
}
