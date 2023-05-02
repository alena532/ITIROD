import { formatDate } from "./month";

const Nowdate = new Date();
const WeekFirstDay = new Date(Nowdate - Nowdate.getDay() * 86400000);
const WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);

//showWeekCalendar(WeekFirstDay, WeekLastDay);
function formatTime(date) {
  let hh = date.getHours();
  if (hh < 10) hh = "0" + hh;

  let mm = date.getMinutes();
  if (mm < 10) mm = "0" + mm;

  return hh + ":" + mm;
}

function addHour(date) {
  var hour = Number(date.split(':')[0])
  hour == 24 ? hour = 0 : hour += 1;
  if (hour < 10) hour = "0" + hour;
  return date.replace(date.split(':')[0],String(hour))
}


export function showWeekCalendar(start, end) {
  let events = [];
  let themes = [];
  try {
    events = JSON.parse(localStorage.getItem("events"));
    themes = JSON.parse(localStorage.getItem("themes"));
  } catch {}
  const calendarHeader = document.getElementById("week-calendar-header");
  let currentDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  let currentTime = formatTime(new Date(start.getFullYear(), start.getMonth(), start.getDate(),0,0));
  let dayStartWeek = start.getDate();
  let monthStartWeek = start.getMonth()+1;
  let dayEndWeek = end.getDate();
  let monthEndWeek = end.getMonth()+1;
  if (dayStartWeek < 10) {
    dayStartWeek = "0" + dayStartWeek;
  }
  if (monthStartWeek < 10) {
    monthStartWeek = "0" + monthStartWeek;
  }
  if (dayEndWeek < 10) {
    dayEndWeek = "0" + dayEndWeek;
  }
  if (monthEndWeek < 10) {
    monthEndWeek = "0" + monthEndWeek;
  }
  calendarHeader.innerHTML = `${dayStartWeek}.${monthStartWeek}-${dayEndWeek}.${monthEndWeek}`;
  
  const tbl = document.getElementById("week-body");
  tbl.innerHTML = "";
  for (let i = 0; i < 24; i++) {
    const row = document.createElement("tr");
    row.classList.add("week-tr");
    const hourCell = document.createElement("td");
    hourCell.classList.add("week-td");
    hourCell.innerHTML = i + ":00";
    row.appendChild(hourCell);

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
     // cell.classList.add("week-table-body-cell");
      cell.classList.add("week-td");
      row.appendChild(cell);
      const cellContent = document.createElement("div");
        if (localStorage.getItem("UID")) {
          let day = formatDate(currentDate);
          events.forEach((event) => {
            console.log(day)
            console.log(currentTime)
            console.log(event.day)
            console.log(event.timeFrom)
            cellContent.classList.add("calendar-cell");
            if (event.day === day && (currentTime.split(':')[0] >= event.timeFrom.split(':')[0] && currentTime <= event.timeTill)) {
              cell.classList.add("calendar-event-td");
              cellContent.classList.add("calendar-event-cell");
              const eventName = document.createElement("span");
              eventName.innerHTML = event.name;
              cellContent.appendChild(eventName);
              const time = document.createElement("span");
              time.innerHTML = `${event.timeFrom} - ${event.timeTill}`;
              time.classList.add("event-time");
              cellContent.appendChild(time);
             // cellContent.appendChild(eventName);
              themes.forEach((theme) => {
                if (theme.name === event.theme) {
                  cell.style.backgroundColor = theme.color;
                }
              });
            }
           
          });
        }
        cell.appendChild(cellContent);
      
      if (j == 6){
        currentDate.setDate(currentDate.getDate()-6)
      }
      else{
        currentDate.setDate(currentDate.getDate()+1)
      }

    }
    tbl.appendChild(row);
    currentTime = addHour(currentTime);
  }
}