const contactForm = document.getElementById("contactForm");
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  successModal.style.display = "flex"; 
  contactForm.reset();
});

closeModal.addEventListener("click", () => {
  successModal.style.display = "none"; 
});
