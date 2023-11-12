document.addEventListener("DOMContentLoaded", function () {
  const desireWeightInput = document.getElementById("desireWeightInput");
  const submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", () => {
    const desireWeight = desireWeightInput.value.trim();

    if (desireWeight === "") {
      console.log("ERROR");
    } else {
      document.cookie = `userDesireWeight=${desireWeight}`;
      window.location.href = "quiz6.html";
    }
  });
});
