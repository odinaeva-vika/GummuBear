document.addEventListener("DOMContentLoaded", function () {
  const lifestyleCheckbox = document.querySelectorAll(".js-lifestyleCheckbox");
  const submitButton = document.getElementById("submit");

  const isAnyCheckboxChecked = () => {
    return Array.from(lifestyleCheckbox).some((checkbox) => checkbox.checked);
  };

  lifestyleCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      lifestyleCheckbox.forEach((otherCheckbox) => {
        if (otherCheckbox !== event.target) {
          otherCheckbox.disabled = event.target.checked;
        }
      });
      submitButton.disabled = !isAnyCheckboxChecked();
    });
  });

  submitButton.addEventListener("click", () => {
    if (isAnyCheckboxChecked()) {
      const userLifestyle = Array.from(lifestyleCheckbox)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      document.cookie = `userLifestyle=${JSON.stringify(userLifestyle)}`;

      window.location.href = "quiz5.html";
    }
  });
});
