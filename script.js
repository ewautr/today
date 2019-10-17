"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  loadJSON();
  showInspMes();
  showTime();
  showDate();
}

//DATE
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const today = new Date();
let number = today.getDay();
let i = 0;
const yyyy = today.getFullYear();
const mm = months[today.getMonth()];
let dd = suffixedDay(today.getDate());
let wd = days[number];

//EVENT FOR CHANGING DISPLAYED THE DAY
document.querySelector(".nextDay").addEventListener("click", e => {
  document.querySelector(".tasks-container").classList.add("taskAnimate");

  document.querySelector("#pageTitle").textContent = "Next.";
  document.querySelector(".tasks-container").innerHTML = "";
  number++;
  i++;
  if (number > 6) {
    number = 0;
  }
  dd = suffixedDay(today.getDate() + i);
  wd = days[number];
  init();
  setTimeout(() => {
    document.querySelector(".tasks-container").classList.remove("taskAnimate");
  }, 1000);
});

const tomorrow = days[today.getDay() + 1];

function suffixedDay(n) {
  return (
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "")
  );
}

function showDate() {
  const curDate = `${wd} ${dd} ${mm} ${yyyy}`;
  document.querySelector(".content-day").textContent = curDate;
}

//TIME
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + "." + minutes + " " + ampm;
  return strTime;
}
const curTime = formatAMPM(new Date());
function showTime() {
  document.querySelector(".content-time").textContent = curTime;
}

//CHANGE TITLE
const input = document.querySelector("#changeTitle");
const title = document.querySelector("#pageTitle");
const button = document.querySelector("#submitTitle");

button.addEventListener("click", e => {
  title.textContent = "";
  title.textContent = input.value;
  input.value = "";
});

//CHANGE COLOR
document.querySelectorAll("#colorTheme").forEach(option => {
  option.addEventListener("change", setTheme);
});

function setTheme() {
  let chosenTheme = this.value;
  const html = document.querySelector("html");
  if (chosenTheme == "yellow") {
    html.setAttribute("data-attribute", "yellow");
  } else if (chosenTheme == "green") {
    html.setAttribute("data-attribute", "green");
  } else if (chosenTheme == "blue") {
    html.setAttribute("data-attribute", "blue");
  } else if (chosenTheme == "pink") {
    html.setAttribute("data-attribute", "pink");
  } else if (chosenTheme == "defoult") {
    html.setAttribute("data-attribute", "");
  } else if (chosenTheme == "yellow") {
    html.setAttribute("data-attribute", "yellow");
  }
}

//SHOW TASK
const jsonLink = "tasks.json";
function loadJSON() {
  fetch(jsonLink)
    .then(response => response.json())
    .then(jsonData => {
      getData(jsonData);
    });
}

function getData(jsonData) {
  jsonData.forEach(displayTask);
}

function displayTask(task) {
  if (task.day === wd) {
    const clone = document.querySelector("#template").cloneNode(true).content;
    clone.querySelector("h2").textContent = "Task:";
    clone.querySelector("h3").textContent = `when: ${task.time}`;
    clone.querySelector("p").textContent = `what: ${task.description}`;
    document.querySelector(".tasks-container").appendChild(clone);
  }
}

//MESSAGE OF THE DAY
function showInspMes() {
  document.querySelector(".insp").textContent = `${wd}'s inspiration:`;
  if (wd === days[0]) {
    document.querySelector(".message").textContent = `Be kind.`;
  } else if (wd === days[1]) {
    document.querySelector(".message").textContent = `Hire Ewa as an intern.`;
  } else if (wd === days[2]) {
    document.querySelector(".message").textContent = `Be polite.`;
  } else if (wd === days[3]) {
    document.querySelector(".message").textContent = `Hire Ewa as an intern.`;
  } else if (wd === days[4]) {
    document.querySelector(".message").textContent = `Be productive.`;
  } else if (wd === days[5]) {
    document.querySelector(".message").textContent = `Hire Ewa as an intern.`;
  } else if (wd === days[6]) {
    document.querySelector(".message").textContent = `Be positive.`;
  }
}

//WEATHER

const myKey = "2f731d68266059566f0e98e6c2e29449";
const cphID = "2618425";
loadWeather();
function loadWeather() {
  fetch(
    // `https://api.openweathermap.org/data/2.5/weather?id=${cphID}&appid=${myKey}`
    `http://api.weatherstack.com/current?access_key=5d981d3370e966c5506c614b65e84690&query=Copenhagen`
  )
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData);
      showWeather(jsonData);
    });
}

function showWeather(data) {
  if (data.current.temperature < 18) {
    document.querySelector(".content-weather").textContent = `cold outside`;
  } else {
    document.querySelector(".content-weather").textContent = `hot outside`;
  }

  document.querySelector(".content-weather2").textContent = `${
    data.current.temperature
  } deg and ${data.current.weather_descriptions.toString().toLowerCase()}`;
}

//MENU SLIDER
const navIcon = document.querySelector(".navIcon");
const nav = document.querySelector("nav");
const x = document.querySelector(".close");

navIcon.addEventListener("click", e => {
  nav.classList.toggle("slideIn");
});
x.addEventListener("click", e => {
  nav.classList.toggle("slideIn");
});
