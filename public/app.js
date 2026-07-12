const form = document.querySelector("#inviteForm");
const title = document.querySelector("#previewTitle");
const body = document.querySelector("#previewBody");
const whatsappLink = document.querySelector("#leadWhatsappLink");

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
