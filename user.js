import { getDatabase, ref, onValue,set,remove } from "firebase/database";
export class User {
  static async create(user) {
    const response = await fetch(
      "https://calendar-58c7e-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  static async deleteTheme(eventId, uid) {
    var db = getDatabase();
    const response = await fetch(`https://calendar-58c7e-default-rtdb.firebaseio.com/users/${uid}/themes/${eventId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });
    
      let themes = JSON.parse(localStorage.getItem("themes"));
      console.log(themes)
      themes.forEach((event)=>{
        if (event.id == eventId){
          var index = themes.indexOf(event);
          if (index !== -1) {
            themes.splice(index, 1);
          }
        }
      })
      console.log(themes)
      localStorage.setItem("themes", JSON.stringify(themes));
   
  }

  static async addEvent(event, uid) {
    const response = await fetch(
      `https://calendar-58c7e-default-rtdb.firebaseio.com/users/${uid}/events.json`,
      {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(()=>{
      let events = JSON.parse(localStorage.getItem("events"));
      events.push(event)
      localStorage.setItem("events", JSON.stringify(events));
    })
    console.log(response)
  }

  static  async addTheme(theme, uid) {
    const db = getDatabase();
    let theme_id ;
    const response = await fetch(
      `https://calendar-58c7e-default-rtdb.firebaseio.com/users/${uid}/themes.json`,
      {
        method: "POST",
        body: JSON.stringify(theme),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(() => {
      let themes = JSON.parse(localStorage.getItem("themes"));
      themes.push(theme)
      localStorage.setItem("themes", JSON.stringify(themes));
      /*console.log(data)
      theme_id = data.name;
      var themeRef = ref(getDatabase(),`users/${uid}/themes/${theme_id}`);
      onValue(themeRef  , (eventsSnap) => {
        let theme = eventsSnap.val();
        theme.id=theme_id;
        let themes = JSON.parse(localStorage.getItem("themes"));
        themes.push(theme);
       
       console.log(themes);
        localStorage.setItem("themes", JSON.stringify(themes));
      });
      */
      
    });
    
  }

  static async readEventsFromDB(uid) {
    console.log(1)
    const db = getDatabase();
    let events = [];
    localStorage.setItem("events", []);
   // try {
      const eventsRef = ref(db, `users/${uid}/events`)
      onValue(eventsRef , (eventsSnap) => {
        eventsSnap.forEach((eventsChild) => {
          let event = eventsChild.val();
          events.push(event);
        });
        localStorage.setItem("events", JSON.stringify(events));
      });
   // } catch (e) {
   //   alert(e);
   // }
    
  }

  static async readThemesFromDB(uid) {
    let themes = [];
    try {
      const db = getDatabase();
      const themesRef = ref(db, `users/${uid}/themes`);
      onValue(themesRef, (themesSnap) => {
        themesSnap.forEach((themesChild) => {
          let theme = themesChild.val();
          theme.id = themesChild.key;
          themes.push(theme);
        });
        console.log(themes);
        localStorage.setItem("themes", JSON.stringify(themes));
      });
    } catch (e) {
      alert(e);
    }
  }
}