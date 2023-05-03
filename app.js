import "./style.css";
import "./scripts";
import "./routing";
import "./src/add-new";
import "./src/add-theme";
import "./src/month-table.html";
import "./src/week-table.html";
import "./src/year-table.html";
import "./src/add-new.html";
import "./src/add-theme.html";
import "./src/sign-in.html";
import "./src/sign-up.html";
import "./src/month";
import "./src/week";
import "./src/year";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
  } from "firebase/auth";
  import { async } from "@firebase/util";
  import { User } from "./user";
  import { showMonthCalendar } from "./src/month";
  import { locationHandler } from "./routing";
  const { app } = require("./firebase");
  const { db } = require("./firebase");
  const {ref} = require("./firebase");
  const {set} = require("./firebase");
  const {remove} = require("./firebase");
  const auth = getAuth(app);
  
  export function setupAuthListener() {
    onAuthStateChanged(auth, (user) => {
      const addNewButton = document.getElementById("add_new_button");
      const themes = document.getElementById("my_themes");
      const asideThemes = document.getElementById("aside_themes");
      const asideSignUpButton = document.getElementById("aside_sign_in");
      const asideExitButton = document.getElementById("aside_exit_button");
      const signInButton = document.getElementById("enter_button");
      const signUpButton = document.getElementById("reg_button");
      const exitButton = document.getElementById("exit_button");
      const asideAddNewButton = document.getElementById("aside_add_new_button")
      const asideSignInButton = document.getElementById("aside_sign_up");
      if (user) {
        if (localStorage.getItem("UID") !==null) {
          signInButton.classList.add("button-not-active");
          signUpButton.classList.add("button-not-active");
          exitButton.classList.remove("button-not-active");
          asideAddNewButton.classList.remove("button-not-active");
          addNewButton.classList.remove("button-not-active");
          themes.classList.remove("button-not-active");
          asideThemes.classList.remove("button-not-active");
          asideSignInButton.classList.add("button-not-active");
          asideSignUpButton.classList.add("button-not-active");
          asideExitButton.classList.remove("button-not-active");
          pushThemes();
        }
      } else {
        signInButton.classList.remove("button-not-active");
        signUpButton.classList.remove("button-not-active");
        exitButton.classList.add("button-not-active");
        asideAddNewButton.classList.add("button-not-active");
        asideThemes.classList.add("button-not-active");
        addNewButton.classList.add("button-not-active");
        themes.classList.add("button-not-active");
        asideSignInButton.classList.remove("button-not-active");
        asideSignUpButton.classList.remove("button-not-active");
        asideExitButton.classList.add("button-not-active");
      }
    });
  }
  
  //setupAuthListener();
  export function pushThemes() {
    const themesContainer = document.getElementById("themes_container");
    const asideThemesContainer = document.getElementById("aside_themes_container");
    let themes = [];
    try {
      themes = JSON.parse(localStorage.getItem("themes"));
    } catch {}
    if(themesContainer.childElementCount===themes.length) return;
    themes.forEach((theme) => {
      const themeConteiner = document.createElement("div");
      themeConteiner.classList.add("theme-container");
      const themeTitle = document.createElement("label");
      themeTitle.classList.add("theme-title");
      themeTitle.innerHTML = theme.name;
     // const closeButton = document.createElement("button");
      //closeButton.classList.add("close-theme-btn");
      //closeButton.innerHTML='x';
      //closeButton.addEventListener("click",deleteThemeToDB);
      //closeButton.myParam=theme.id;
      themeConteiner.appendChild(themeTitle);
      //themeConteiner.appendChild(closeButton);
      themeConteiner.style.backgroundColor = theme.color;
      asideThemesContainer.appendChild(themeConteiner);
      themesContainer.appendChild(themeConteiner);
    });

    
  }

  export function pushAsideThemes() {
    const asideThemesContainer = document.getElementById("aside_themes_container");
    let themes = [];
    try {
      themes = JSON.parse(localStorage.getItem("themes"));
    } catch {}
    themes.forEach((theme) => {
      const themeConteiner = document.createElement("div");
      themeConteiner.classList.add("theme-container");
      const themeTitle = document.createElement("label");
      themeTitle.classList.add("theme-title");
      themeTitle.innerHTML = theme.name;
      themeConteiner.appendChild(themeTitle);
      themeConteiner.style.backgroundColor = theme.color;
      asideThemesContainer.appendChild(themeConteiner);
    });
  }


  window.registration = async function () {
    let valid = true;
    let emailValid=true;
    let passwordValid=true;
    let emailEmptyError = document.getElementById("email-empty-error");
    let passwordEmptyError = document.getElementById("password-empty-error");
    let emailError = document.getElementById("email-error");
    let passwordError = document.getElementById("password-error");
    let loginPasswordError = document.getElementById("login-pass-error");

    emailEmptyError.classList.add("err-not-display");
    passwordEmptyError.classList.add("err-not-display");
    emailError.classList.add("err-not-display");
    passwordError.classList.add("err-not-display");
    loginPasswordError.classList.add("err-not-display");

    const emailRegistrationInput = document.getElementById("reg_login");
    const passwordRegistrationInput = document.getElementById("reg_password");

    if(emailRegistrationInput.value.length === 0){
      emailEmptyError.classList.remove("err-not-display");
      valid=false;
      emailValid=false;
    }

    if(passwordRegistrationInput.value.length === 0){
      passwordEmptyError.classList.remove("err-not-display");
      valid=false;
      passwordValid=false;
    }

    if(emailValid==true && !emailRegistrationInput.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
      emailError.classList.remove("err-not-display");
      valid=false;
    }

    if(passwordValid==true && passwordRegistrationInput.value.length < 6){
      passwordError.classList.remove("err-not-display");
      valid=false;
    }
    if(valid==false) return;

    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRegistrationInput.value,
        passwordRegistrationInput.value
      );
      setTimeout(function() {
        alert("Вы зарегистрированы");
        let link = document.getElementById("sign_up_close");
        link.click();
      }, 1500);
    } catch ({ message }) {
      loginPasswordError.classList.remove("err-not-display");
    }
  };
  
  window.method = async function () {
    var event = new Event('DOMContentLoaded');
     document.dispatchEvent(event);
  }

  window.enter = async function () { 
    let valid = true;
    let emailValid=true;
    let passwordValid=true;
    let emailEmptyError = document.getElementById("email-empty-error");
    let passwordEmptyError = document.getElementById("password-empty-error");
    let emailError = document.getElementById("email-error");
    let passwordError = document.getElementById("password-error");
    let passwordLoginError =  document.getElementById("login-pass-error")

    emailEmptyError.classList.add("err-not-display");
    passwordEmptyError.classList.add("err-not-display");
    emailError.classList.add("err-not-display");
    passwordError.classList.add("err-not-display");
    passwordLoginError.classList.add("err-not-display");

    const emailLoginInput = document.getElementById("enter_login");
    const passwordLoginInput = document.getElementById("enter_password");

    if(emailLoginInput.value.length === 0){
      emailEmptyError.classList.remove("err-not-display");
      valid=false;
      emailValid=false;
    }

    if(passwordLoginInput.value.length === 0){
      passwordEmptyError.classList.remove("err-not-display");
      valid=false;
      passwordValid=false;
    }

    if(emailValid==true && !emailLoginInput.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
      emailError.classList.remove("err-not-display");
      valid=false;
    }

    if(passwordValid==true && passwordLoginInput.value.length < 6){
      passwordError.classList.remove("err-not-display");
      valid=false;
    }
    if(valid==false) return;
    try {
      await signInWithEmailAndPassword(
        auth,
        emailLoginInput.value,
        passwordLoginInput.value
      );
      await new Promise(onAuthStateChanged(auth,async (user) => {
        if (user) {
          console.log(user.uid)
          const uid = user.uid;
          localStorage.setItem("UID", uid);
          await User.readEventsFromDB(uid);
          await User.readThemesFromDB(uid);
          setTimeout(function() {
            let link = document.getElementById("sign_in_close");
            link.click();
            setupAuthListener();
          }, 2400);
        }
      }));
    } catch ({ message }) {
      passwordLoginError.classList.remove("err-not-display");
    }
  };

  window.addThemeToDB = async function () {
    const auth = getAuth(app);
    let valid = true;
    let themeNameError = document.getElementById("theme-name-error");
    let themeNameUniqueError = document.getElementById("theme-name-unique-error");

    themeNameError.classList.add("err-not-display");
    themeNameUniqueError.classList.add("err-not-display");

    const themeName = document.getElementById("new_theme_name");
    const themeColor = document.getElementById("new_theme_color");

    if (themeName.value.length === 0){
      themeNameError.classList.remove("err-not-display");
      valid =false;
    }

    let themes = JSON.parse(localStorage.getItem("themes"));
    themes.forEach(theme=>{
      if(theme.name === themeName.value){
        themeNameUniqueError.classList.remove("err-not-display");
        valid =false;
      }
    })

    if(valid === false) return;

    const user = auth.currentUser;
    if (user) {
      const theme = {
        uid: user.uid,
        name: themeName.value,
        color: themeColor.value,
      };
      await User.addTheme({
        uid: user.uid,
        name: themeName.value,
        color: themeColor.value,
      }, user.uid);
      setTimeout(function() {
        let link = document.getElementById("add_theme_close");
        link.click();
        setupAuthListener();
      }, 2400);
      
    }   
  };
  
  window.exit = function () {
    localStorage.removeItem("UID");
    localStorage.removeItem("events");
    localStorage.removeItem("themes");
    auth.signOut();
    const themesContainer = document.getElementById("themes_container");
    themesContainer.innerHTML = "";
    const themesAsideContainer = document.getElementById("aside_themes_container");
    themesAsideContainer.innerHTML = "";
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    showMonthCalendar(currentMonth, currentYear, false);
  };
  
  export const deleteThemeToDB = async (evt) =>  {
    const user = auth.currentUser;
    console.log(evt.currentTarget.myParam)
    User.deleteTheme(evt.currentTarget.myParam,user.uid);
    //pushThemes()
  };
