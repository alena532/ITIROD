import {route} from "../routing";

const today = new Date();
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
  "December",
];

export function formatDate(date) {
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy = date.getFullYear();
  if (yy < 10) yy = "0" + yy;
  return yy + "-" + mm + "-" + dd;
}

export function showMonthCalendar(month, year, flag = false) {
  console.log(localStorage.getItem("events"))
  let events = [];
  let themes = [];
  try {
    events = JSON.parse(localStorage.getItem("events"));
    themes = JSON.parse(localStorage.getItem("themes"));
  } catch {}
  const calendarHeader = document.getElementById("calendar-header");
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  let tbl = null;
  if (flag === true) {
    tbl = document.createElement("tbody");
  } else {
    tbl = document.getElementById("calendar-body");
  }

  tbl.innerHTML = "";
  if (flag === false) {
    calendarHeader.innerHTML = months[month] + " " + year;
  }
  let date = 1;
  for (let i = 0; i < 6; i++) {
    if (date > daysInMonth) {
      break;
    }
    const row = document.createElement("tr");
    if (flag === true) {
    } else {
      row.classList.add("month-tr");
    }

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else {
        const cell = document.createElement("td");
        cell.classList.add("month-td");
        const cellContent = document.createElement("div");
        cellContent.classList.add("calendar-cell");
        const cellText = document.createElement("span");
        cellText.innerHTML = date;
        cellText.classList.add("cell-number");
        cellContent.appendChild(cellText);
        let day = formatDate(new Date(year, month, date));
        if (localStorage.getItem("UID")) {
          events.forEach((event) => {
            if (event.day === day) {
              cell.classList.add("calendar-event-td");
              cellContent.classList.add("calendar-event-cell");
              const eventName = document.createElement("span");
              eventName.innerHTML = event.name;
              cellContent.appendChild(eventName);
              const time = document.createElement("span");
              time.innerHTML = `${event.timeFrom} - ${event.timeTill}`;
              time.classList.add("event-time");
              cellContent.appendChild(time);
              themes.forEach((theme) => {
                if (theme.name === event.theme) {
                  cell.style.backgroundColor = theme.color;
                }
              });
            }
          });
        }
        cell.appendChild(cellContent);
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row);
  }
  return tbl;
}