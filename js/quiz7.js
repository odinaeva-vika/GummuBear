document.addEventListener("DOMContentLoaded", function () {
  const cardiovascularCheckbox = document.querySelectorAll(
    ".js-cardiovascularCheckbox"
  );
  const submitButton = document.getElementById("submit");

  const isAnyCheckboxChecked = () => {
    return Array.from(cardiovascularCheckbox).some(
      (checkbox) => checkbox.checked
    );
  };

  cardiovascularCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      cardiovascularCheckbox.forEach((otherCheckbox) => {
        if (otherCheckbox !== event.target) {
          otherCheckbox.disabled = event.target.checked;
        }
      });
      submitButton.disabled = !isAnyCheckboxChecked();
    });
  });

  submitButton.addEventListener("click", () => {
    if (isAnyCheckboxChecked()) {
      const userCardiovascular = Array.from(cardiovascularCheckbox)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      document.cookie = `userCardiovascular=${JSON.stringify(
        userCardiovascular
      )}`;

      window.location.href = "quiz8.html";
    }
  });
});
