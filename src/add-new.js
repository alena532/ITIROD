import { User } from "../user";
import { app } from "firebase/database";
import {getAuth} from "firebase/auth";

  export function pushThemesInForm(domElement) {
    console.log(domElement)
    let select = domElement.querySelector(".theme-select");
    let themes = [];
      try {
        themes = JSON.parse(localStorage.getItem("themes"));
      } catch {}
      themes.forEach((theme) => {
        const themeOption = document.createElement("option");
        themeOption.innerHTML = theme.name;
        themeOption.value = theme.name;
        select.appendChild(themeOption);
      });
      const timeFrom = domElement.querySelector('input[name="time_from"]');
      const timeTill = domElement.querySelector('input[name="time_till"]');
      
      document.getElementById("modal-window").appendChild(domElement.getElementById("add-new"));
  }  

  window.addEventToDB = async function () {
    const auth = getAuth(app);
    let valid = true;
    //validation

    let eventNameError = document.getElementById("name-error");
    let eventDateError = document.getElementById("date-error");
    let selectError = document.getElementById("select-error");
    let eventTimeFromError = document.getElementById("time-from-error");
    let eventTimeTillError = document.getElementById("time-till-error");
    let eventTimeTillLessError = document.getElementById("time-till-less-error");

    eventNameError.classList.add("err-not-display");
    eventDateError.classList.add("err-not-display");
    eventTimeFromError.classList.add("err-not-display");
    eventTimeTillError.classList.add("err-not-display");
    eventTimeTillLessError.classList.add("err-not-display");
    selectError.classList.add("err-not-display");

    if (document.getElementById("event_name").value.length === 0){
      eventNameError.classList.remove("err-not-display");
      valid = false;
    }

    if (document.getElementById("date_from").value.length === 0){
      eventDateError.classList.remove("err-not-display");
      valid =false;
    }

    if (document.getElementById("time_from").value.length === 0){
      eventTimeFromError.classList.remove("err-not-display");
      valid =false;
    }

    if (document.getElementById("time_till").value.length === 0){
      eventTimeTillError.classList.remove("err-not-display");
      valid =false;
    }

    if(document.getElementById("time_till").value<document.getElementById("time_from").value){
      eventTimeTillLessError.classList.remove("err-not-display");
      valid =false;
    }

    if(document.querySelector(".theme-select").childElementCount===0){
      selectError.classList.remove("err-not-display");
      valid =false;
    }
  
    if(valid == false) {
      return;
    }
    const eventName = document.getElementById("event_name");
    const day = document.getElementById("date_from");
    const timeFrom = document.getElementById("time_from");
    const timeTill = document.getElementById("time_till");
    const theme = document.getElementById("theme");
    const user = auth.currentUser;
    if (user) {
    await User.addEvent({
      uid: user.uid,
      name: eventName.value,
      day: day.value,
      timeFrom: timeFrom.value,
      timeTill: timeTill.value,
      theme: theme.value,
    }, user.uid);
    let link = document.getElementById('popup-area');
    link.click();
    }

  };

  