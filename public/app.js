const form = document.querySelector("#inviteForm");
const title = document.querySelector("#previewTitle");
const body = document.querySelector("#previewBody");

if (form && title && body) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const group = document.querySelector("#groupInput").value.trim() || "My warm community circle";
    const interest = document.querySelector("#interestInput").value;
    const action =
      document.querySelector("#actionInput").value.trim() ||
      "confirm the next cozy community moment and send a warm reminder.";

    title.textContent = group;
    body.textContent = `Invite this circle to ${interest}. Suggested next step: ${action}`;
  });
}
