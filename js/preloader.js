document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preloader");
  const progressBar = document.getElementById("progress-bar");

  let progress = 0;
  progressBar.innerText = `${progress}%`;

  const interval = setInterval(() => {
    if (progress < 100) {
      progress++;
      progressBar.innerText = `${progress}%`;
    } else {
      clearInterval(interval);
      preloader.style.opacity = 0;
      setTimeout(() => {
        preloader.style.display = "none";
        // Перенаправляем на вторую страницу
        window.location.href = "sales.html";
      }, 0);
    }
  }, 40); // Анимация загрузки длится 4 секунды (100 * 40ms)
});
