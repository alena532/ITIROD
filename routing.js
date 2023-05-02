import {pushThemesInForm} from "./src/add-new";


const routesHtml = {
  '/': "./src/month-table.html",
  '/week': "./src/week-table.html",
  '/year': "./src/year-table.html",
  '/add-new': "./src/add-new.html",
  '/sign-up': "./src/sign-up.html",
  '/sign-in': "./src/sign-in.html",
  '/add-theme': "./src/add-theme.html",
};

export const route = async (href,event) => {
  event = event || window.event; 
  event.preventDefault();

  window.history.pushState({}, "", event.target.href);
  await locationHandler(href);
  window.onpopstate = locationHandler;
  window.route=route;
};

export const locationHandler = async (href) => {
  if (location.length == 0) {
      location = "/";
  }
  const route = routesHtml[href];
  console.log(route)
  let html;
  if (href === '/add-new'){
    html = await fetch(route).then((data) => data.text())
    .then(html=>{
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      return doc;
    })
    console.log(html);
    pushThemesInForm(html);
    return;
  } else{
    html = await fetch(route).then((data) => data.text())
  }
  
  const modalSet = new Set(["./src/add-new.html", "./src/sign-up.html", "./src/sign-in.html", "./src/add-theme.html"]);


  if(modalSet.has(route)){
    console.log(html);
    document.getElementById("modal-window").innerHTML = html;
  }
  else{
    document.getElementById("calendar-container").innerHTML = html;
  }
 
};
