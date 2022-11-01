// VARIABLES

const openButton = document.querySelector(".toggle");
const seasonMenu = document.querySelector(".seasons");
const appElement = document.querySelector(".app");
const playButton = document.querySelector(".play");
const pauseButton = document.querySelector(".pause");
const seasons = document.querySelectorAll(".season");
const imageElement = document.querySelector(".image img");
const durations = document.querySelectorAll(".duration");
const remainingTimeElement = document.querySelector(".audio-remaining-time");
const path = document.querySelector(".rect");

const audio = document.querySelector(".audio audio");
let audioDuration = 120;

const pathLength = path.getTotalLength();

let mouseMoved = new Date();
const inactiveTime = 5000;

// EVENT LISTENERS

playButton.addEventListener("click", () => {
  audio.play();
  updateApp();
});

pauseButton.addEventListener("click", () => {
  audio.pause();
});

openButton.addEventListener("click", () => {
  seasonMenu.classList.toggle("open");
  openButton.classList.toggle("rotate");
});

seasons.forEach((season) => {
  season.addEventListener("click", () => {
    imageElement.src = season.getAttribute("image-src");
  });
});

durations.forEach((duration) => {
  duration.addEventListener("click", () => {
    audioDuration = duration.getAttribute("audio-duration");
    updateApp();
  });
});

// OUTLINE FUNCTION

path.style.strokeDasharray = pathLength;

function updateApp() {
  if (audio.currentTime >= audioDuration) {
    audio.pause();
    audio.currentTime = 0;
  }

  let portionAudioPlayed = audio.currentTime / audioDuration;

  path.style.strokeDashoffset = -portionAudioPlayed * pathLength;

  let remainingTimeInSeconds = audioDuration - audio.currentTime;
  remainingTime(remainingTimeInSeconds);

  if (!audio.paused) {
    requestAnimationFrame(updateApp);
  }
}

updateApp();

// REMAINING TIME FUNCTION

function remainingTime(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = Math.floor(timeInSeconds & 60);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  remainingTimeElement.innerHTML = `${minutes}:${seconds}`;
}

// SCREENSAVER FUNCTION

document.addEventListener("mousemove", () => {
  mouseMoved = new Date();
  appElement.classList.remove("inactive");

  document.body.style.cursor = "auto";
});

function screenSaver() {
  let now = new Date();
  let deltaTime = now - mouseMoved;
  if (deltaTime >= inactiveTime) {
    appElement.classList.add("inactive");
    document.body.style.cursor = "none";
  }
  requestAnimationFrame(screenSaver);
}

screenSaver();
