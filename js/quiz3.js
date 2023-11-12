document.addEventListener("DOMContentLoaded", function () {
  const heightInput = document.getElementById("heightInput");
  const weightInput = document.getElementById("weightInput");
  const submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", () => {
    const height = heightInput.value.trim();
    const weight = weightInput.value.trim();

    if (height === "" || weight === "") {
      console.log("ERROR");
    } else {
      document.cookie = `userHeight=${height}`;
      document.cookie = `userWeight=${weight}`;
      window.location.href = "quiz4.html";
    }
  });
});
