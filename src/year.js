import { showMonthCalendar } from "./month";

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

export function showYearCalendar(year) {
  const calendarHeader = document.getElementById("year-calendar-header");
  const yearTable = document.getElementById("year_table");
  yearTable.innerHTML = "";
  months.forEach((month) => {
    const monthContainer = document.createElement("div");
    const monthName = document.createElement("span");
    monthName.innerHTML = month;
    monthName.classList.add("month-name");
    monthContainer.appendChild(monthName);
    const tableHead = document.getElementById("month_thead");
    const tH = tableHead.cloneNode(true);
    tH.classList.remove("button-not-active");
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
  const deleteTable = document.getElementById("delete-table");
  deleteTable.style.display = "none";
}