const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
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
date_from.min = new Date().toISOString().split("T")[0];
date_till.min = new Date().toISOString().split("T")[0];
date_from.onchange = ({ target: { value } }) => {
  date_till.setAttribute(
    "min",
    value || new Date().toISOString().split("T")[0]
  );
};

const calendarHeader = document.getElementById("calendar-header");
showMonthCalendar(currentMonth, currentYear, false);

const Nowdate = new Date();
const WeekFirstDay = new Date(Nowdate - Nowdate.getDay() * 86400000);
const WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);

const menuBtn = document.querySelector(".menu-btn");
const mobileAside = document.querySelector(".mobile-aside");
const calendarContainer = document.querySelector(".calendar-container");
const calendarTable = document.querySelector(".calendar-table");
const calendarBody = document.querySelector(".calendar-body");
const mobileAsideContainer = document.querySelector(".mobile-aside-container");

menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("active");
  mobileAsideContainer.classList.toggle("mobile-aside-container-active");
  mobileAside.classList.toggle("mobile-aside-active");
});

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showMonthCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showMonthCalendar(currentMonth, currentYear);
}

function showWeekCalendar(start, end) {
  let dayStartWeek = start.getDate();
  let monthStartWeek = start.getMonth();
  let yearStartWeek = start.getFullYear();
  let dayEndWeek = end.getDate();
  let monthEndWeek = end.getMonth();
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

    let startWeekDay = new Date(yearStartWeek,monthStartWeek,dayStartWeek);

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      cell.classList.add("week-td");
      startWeekDay.setDate(startWeekDay.getDate() + 1);
      if(startWeekDay.getDate() === today.getDate() && startWeekDay.getMonth()==today.getMonth()){
        if(i === 10 || i === 11){
          cell.classList.add("calendar-event-td");
          const cellContent = document.createElement("div");
          cellContent.classList.add("calendar-event-div");
          const eventName = document.createElement("span");
          eventName.innerHTML = "Meeting";
          eventName.classList.add("week-span");
          cellContent.appendChild(eventName);
          cell.appendChild(cellContent);
        }
      }
      row.appendChild(cell);
    }
    tbl.appendChild(row);
  }
}

function showMonthCalendar(month, year, flag = false) {
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  let tbl = null;
  if (flag === true) {
    tbl = document.createElement("tbody");
  } else {
    tbl = document.getElementById("calendar-body");
  }

  tbl.innerHTML = "";
  calendarHeader.innerHTML = months[month] + " " + year;
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
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("calendar-event-td");
          cellContent.classList.add("calendar-event-cell");
          const eventName = document.createElement("span");
          eventName.innerHTML = "Meeting";
          cellContent.appendChild(eventName);
          const time = document.createElement("span");
          time.innerHTML = "10:00 - 11:00";
          time.classList.add("event-time");
          cellContent.appendChild(time);
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

function showYearCalendar(year) {
  const yearTable = document.getElementById("year_table");
  months.forEach((month) => {
    const monthContainer = document.createElement("div");
    const monthName = document.createElement("span");
    monthName.innerHTML = month;
    monthName.classList.add("month-name");
    monthContainer.appendChild(monthName);
    const tableHead = document.getElementById("month_thead");
    const tH = tableHead.cloneNode(true);
    tH.setAttribute("id", `${month}_thead`);
    const monthInYearTable = document.createElement("table");
    tH.classList.add("calendar-head");
    monthInYearTable.appendChild(tH);
    monthInYearTable.appendChild(
      showMonthCalendar(months.indexOf(month), year, true)
    );
    monthInYearTable.classList.add("month-in-year-table");
    monthContainer.appendChild(monthInYearTable);
    monthContainer.classList.add("month-container");
    yearTable.appendChild(monthContainer);
  });
  calendarHeader.innerHTML = " " + year;
}

function onButtonClick(type) {
  const [week, month, year] = document.querySelectorAll(".nav-button");
  const pressed = "nav-button--pressed";
  const nonActive = "days-non-active";
  const weekTable = document.getElementById("week_table");
  const monthTable = document.getElementById("month_table");
  const yearTable = document.getElementById("year_table");

  week.classList.remove(pressed);
  weekTable.classList.add(nonActive);
  month.classList.remove(pressed);
  monthTable.classList.add(nonActive);
  year.classList.remove(pressed);
  yearTable.classList.add(nonActive);
  yearTable.classList.remove("year-table");
  yearTable.innerHTML = "";

  switch (type) {
    case "week":
      week.classList.add(pressed);
      weekTable.classList.remove(nonActive);
      console.log(WeekFirstDay)
      showWeekCalendar(WeekFirstDay, WeekLastDay);
      break;
    case "month":
      month.classList.add(pressed);
      monthTable.classList.remove(nonActive);
      showMonthCalendar(currentMonth, currentYear, false);
      break;
    case "year":
      year.classList.add(pressed);
      yearTable.classList.remove(nonActive);
      yearTable.classList.add("year-table");
      showYearCalendar(currentYear);
      break;
  }
}