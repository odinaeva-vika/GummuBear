document.addEventListener("DOMContentLoaded", function () {
  const ageInput = document.getElementById("ageInput");
  const submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", () => {
    const age = ageInput.value.trim();

    if (age === "") {
      console.log("ERROR");
    } else {
      document.cookie = `userAge=${age}`;
      window.location.href = "quiz3.html";
    }
  });
});
