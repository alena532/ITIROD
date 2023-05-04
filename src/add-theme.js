import { User } from "../user";
import { app } from "firebase/database";
import {getAuth} from "firebase/auth";

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
        isActive: true
      }, user.uid);
      let link = document.getElementById('popup-area');
      link.click();
    }   
  };