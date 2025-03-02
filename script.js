const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const timer = document.getElementById("timer");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

let box = Math.floor(timer.value);
minutes.textContent = Math.floor(box / 60)
  .toString()
  .padStart(2, "0");
seconds.textContent = (box % 60).toString().padStart(2, "0");
hours.textContent = Math.floor(box / 3600)
  .toString()
  .padStart(2, "0");

let interval;
startBtn.addEventListener("click", () => {
  if (!interval) {
    const totalMinutes = parseInt(timer.value);
    if (!totalMinutes || totalMinutes <= 0) {
      // بررسی مقدار ورودی
      return; // اگر مقدار نامعتبر باشد، از اجرای تابع خارج شو
    }
    // ذخیره مقدار اولیه به دقیقه
    if (totalMinutes >= 60) {
      hours.textContent = Math.floor(totalMinutes / 60)
        .toString()
        .padStart(2, "0");
      minutes.textContent = (totalMinutes % 60).toString().padStart(2, "0");
    } else {
      minutes.textContent = totalMinutes.toString().padStart(2, "0");
      hours.textContent = "00";
    }
    seconds.textContent = "00";
  }
  timer.value = ""; // خالی کردن مقدار تایمر

  interval = setInterval(() => {
    let currentSeconds = parseInt(seconds.textContent);
    let currentMinutes = parseInt(minutes.textContent);
    let currentHours = parseInt(hours.textContent);

    if (currentSeconds > 0) {
      currentSeconds--;
    } else {
      if (currentMinutes > 0) {
        currentMinutes--;
        currentSeconds = 59;
      } else if (currentHours > 0) {
        currentHours--;
        currentMinutes = 59;
        currentSeconds = 59;
      } else {
        startBtn.disabled = false;
      }
    }
    seconds.textContent = currentSeconds.toString().padStart(2, "0");
    minutes.textContent = currentMinutes.toString().padStart(2, "0");
    hours.textContent = currentHours.toString().padStart(2, "0");

    if (interval) {
      startBtn.disabled = true;
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  startBtn.disabled = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  startBtn.disabled = false;
  seconds.textContent = "00";
  minutes.textContent = "00";
  hours.textContent = "00";
});
