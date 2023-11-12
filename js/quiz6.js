document.addEventListener("DOMContentLoaded", function () {
  const diabetesCheckbox = document.querySelectorAll(".js-diabetesCheckbox");
  const submitButton = document.getElementById("submit");

  const isAnyCheckboxChecked = () => {
    return Array.from(diabetesCheckbox).some((checkbox) => checkbox.checked);
  };

  diabetesCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      diabetesCheckbox.forEach((otherCheckbox) => {
        if (otherCheckbox !== event.target) {
          otherCheckbox.disabled = event.target.checked;
        }
      });
      submitButton.disabled = !isAnyCheckboxChecked();
    });
  });

  submitButton.addEventListener("click", () => {
    if (isAnyCheckboxChecked()) {
      const userDiabetes = Array.from(diabetesCheckbox)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      document.cookie = `userDiabetes=${JSON.stringify(userDiabetes)}`;

      window.location.href = "quiz7.html";
    }
  });
});
