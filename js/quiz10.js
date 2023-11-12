document.addEventListener("DOMContentLoaded", function () {
  const dreamCheckbox = document.querySelectorAll(".js-dreamCheckbox");
  const submitButton = document.getElementById("submit");

  const isAnyCheckboxChecked = () => {
    return Array.from(dreamCheckbox).some((checkbox) => checkbox.checked);
  };

  dreamCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      dreamCheckbox.forEach((otherCheckbox) => {
        if (otherCheckbox !== event.target) {
          otherCheckbox.disabled = event.target.checked;
        }
      });
      submitButton.disabled = !isAnyCheckboxChecked();
    });
  });

  submitButton.addEventListener("click", () => {
    if (isAnyCheckboxChecked()) {
      const userDream = Array.from(dreamCheckbox)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      document.cookie = `userDream=${JSON.stringify(userDream)}`;

      window.location.href = "preloader.html";
    }
  });
});
