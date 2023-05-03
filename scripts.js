import { showWeekCalendar } from "./src/week";
import { showMonthCalendar } from "./src/month";
import { showYearCalendar } from "./src/year";
import {route} from "./routing";
import { pushAsideThemes } from "./app";

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  route('/').then(() => showMonthCalendar(currentMonth, currentYear, false));
});

const Nowdate = new Date();
const WeekFirstDay = new Date(Nowdate - Nowdate.getDay() * 86400000);
const WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);

const menuBtn = document.querySelector(".menu-btn");
const mobileAside = document.querySelector(".mobile-aside");
const mobileAsideContainer = document.querySelector(".mobile-aside-container");


menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("active");
  mobileAsideContainer.classList.toggle("mobile-aside-container-active");
  mobileAside.classList.toggle("mobile-aside-active");
  if (localStorage.getItem("UID") !==null) pushAsideThemes()
});

window.next = function (type) {
  switch (type) {
    case "week":
      WeekFirstDay.setDate(WeekFirstDay.getDate()+7);
      WeekLastDay.setDate(WeekLastDay.getDate()+7);
      showWeekCalendar(WeekFirstDay,WeekLastDay)
      break;
    case "month":
      currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      currentMonth = (currentMonth + 1) % 12;
      showMonthCalendar(currentMonth, currentYear);
      break;
    case "year":
      currentYear = currentYear + 1;
      showYearCalendar(currentYear);
      break;
  }
};

window.previous = function (type) {
  switch (type) {
    case "week":
      WeekFirstDay.setDate(WeekFirstDay.getDate()-7);
      WeekLastDay.setDate(WeekLastDay.getDate()-7);
      showWeekCalendar(WeekFirstDay,WeekLastDay);
      break;
    case "month":
      currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      showMonthCalendar(currentMonth, currentYear);
      break;
    case "year":
      currentYear = currentYear - 1;
      console.log("year");
      showYearCalendar(currentYear);
      break;
  }
};


window.onButtonClick = async function (href,type) {
  const [week, month, year] = document.querySelectorAll(".nav-button");
  const pressed = "nav-button--pressed";

  week.classList.remove(pressed);
  month.classList.remove(pressed);
  year.classList.remove(pressed);

  switch (type) {
    case "week":
      week.classList.add(pressed);
      await route(href);
      showWeekCalendar(WeekFirstDay, WeekLastDay);
      break;
    case "month":
      month.classList.add(pressed);
      await route(href);
      showMonthCalendar(currentMonth, currentYear, false);
      break;
    case "year":
      year.classList.add(pressed);
      await route(href);
      showYearCalendar(currentYear);
      break;
  }
};
