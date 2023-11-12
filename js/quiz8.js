document.addEventListener("DOMContentLoaded", function () {
  const eatCheckbox = document.querySelectorAll(".js-eatCheckbox");
  const submitButton = document.getElementById("submit");

  const isAnyCheckboxChecked = () => {
    return Array.from(eatCheckbox).some((checkbox) => checkbox.checked);
  };

  eatCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      eatCheckbox.forEach((otherCheckbox) => {
        if (otherCheckbox !== event.target) {
          otherCheckbox.disabled = event.target.checked;
        }
      });
      submitButton.disabled = !isAnyCheckboxChecked();
    });
  });

  submitButton.addEventListener("click", () => {
    if (isAnyCheckboxChecked()) {
      const userEat = Array.from(eatCheckbox)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      document.cookie = `userEat=${JSON.stringify(userEat)}`;

      window.location.href = "quiz9.html";
    }
  });
});
