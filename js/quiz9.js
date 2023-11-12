document.addEventListener("DOMContentLoaded", function () {
  const hungerCheckbox = document.querySelectorAll(".js-hungerCheckbox");
  const submitButton = document.getElementById("submit");

  const isAnyCheckboxChecked = () => {
    return Array.from(hungerCheckbox).some((checkbox) => checkbox.checked);
  };

  hungerCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      hungerCheckbox.forEach((otherCheckbox) => {
        if (otherCheckbox !== event.target) {
          otherCheckbox.disabled = event.target.checked;
        }
      });
      submitButton.disabled = !isAnyCheckboxChecked();
    });
  });

  submitButton.addEventListener("click", () => {
    if (isAnyCheckboxChecked()) {
      const userHunger = Array.from(hungerCheckbox)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      document.cookie = `userHunger=${JSON.stringify(userHunger)}`;

      window.location.href = "quiz10.html";
    }
  });
});
