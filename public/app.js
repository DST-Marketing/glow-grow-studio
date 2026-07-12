const form = document.querySelector("#inviteForm");
const title = document.querySelector("#previewTitle");
const body = document.querySelector("#previewBody");
const whatsappLink = document.querySelector("#leadWhatsappLink");
const heroOrbit = document.querySelector("[data-hero-orbit]");
const orbitButtons = heroOrbit ? Array.from(heroOrbit.querySelectorAll("[data-orbit-action]")) : [];

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
