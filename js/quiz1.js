document.addEventListener("DOMContentLoaded", function () {
  const genderCheckbox = document.querySelectorAll(".js-genderCheckbox");
  const submitButton = document.getElementById("submit");

  const isAnyCheckboxChecked = () => {
    return Array.from(genderCheckbox).some((checkbox) => checkbox.checked);
  };

  genderCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      genderCheckbox.forEach((otherCheckbox) => {
        if (otherCheckbox !== event.target) {
          otherCheckbox.disabled = event.target.checked;
        }
      });
      submitButton.disabled = !isAnyCheckboxChecked();
    });
  });

  submitButton.addEventListener("click", () => {
    if (isAnyCheckboxChecked()) {
      const userGender = Array.from(genderCheckbox)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      document.cookie = `userGender=${JSON.stringify(userGender)}`;

      window.location.href = "quiz2.html";
    }
  });
});
