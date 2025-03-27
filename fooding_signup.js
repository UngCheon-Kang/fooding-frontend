const tabButtons = document.querySelectorAll(".tab-btn");
const personalForm = document.getElementById("personal-form");
const businessForm = document.getElementById("business-form");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.getAttribute("data-type");

    if (type === "personal") {
      personalForm.classList.remove("hidden");
      businessForm.classList.add("hidden");
    } else {
      personalForm.classList.add("hidden");
      businessForm.classList.remove("hidden");
    }
  });
});
