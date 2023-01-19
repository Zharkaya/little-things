const APP = document.getElementById("app");
const KEY = "KVQYG4BUAYWACJQR5VJH2W9FC";

let app = {
    content: () => {        
        APP.insertAdjacentHTML("afterbegin", 
        `<div class="content">
            <form class="change-city" id="ChangeCity">
                <input type="text" placeholder="Выбрать город" id="cngCity">
                <button><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>             
        </div>`);
    }, 
    city: () => {  
        //получаем город по ip 
        fetch('https://ipapi.co/json/')
        .then((responce) => responce.json())
        .then((data) => {            
            app.weater(data.city);
            localStorage.setItem("_u-city", data.city);
        });
    },
    weater: (city) => {  
        //делаем запрос погоды   
        console.log(city);
        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${KEY}&contentType=json`
        fetch(url, {
            "method": "GET",
        })
        .then((responce) => responce.json())
        .then((data) => {   
            //рисуем текущую погоду             
            app.getCurentWeater(data);
            //рисуем погоду на 5 дней вперед
            app.getWeeklyWeather(data.days);
        })
        .catch(err => {
            console.error(err);
        });
    }, 
    getCurentWeater: (data) =>{
        let date = new Date();
        let template = `<div class="current-weather-block">
        <div class="curent-header">
            <div class="city">${data.resolvedAddress}</div>
            <div class="date-time">
                ${data.currentConditions.datetime} ${date.toDateString()}
            </div>
        </div>
        <div class="current-weather">
            <div class="icon">
                <img src="./img/icon/${data.currentConditions.icon}.svg">
                <p>${data.currentConditions.conditions}</p>                        
            </div>
            <div class="weather">
                <p>${data.currentConditions.temp} &deg; C</p>
            </div>
            <div class="info-weather">
                <p>Wind: ${data.currentConditions.windspeed} km/h</p>
                <p>Precip: ${data.currentConditions.precip} mm</p>
                <p>Pressure: ${data.currentConditions.pressure} mb</p>
            </div>
        </div>
        </div>`;
        APP.style.backgroundImage = `url(./img/cover/${data.currentConditions.icon}.jpeg)`
        let content = document.querySelector(".content");
        content.insertAdjacentHTML("beforeend", template);
    },
    getWeeklyWeather: (data) =>{
        let content = document.querySelector(".content");
        content.insertAdjacentHTML("beforeend", "<div class='weekly-weathe-block'></div>");
        let weekly = document.querySelector(".weekly-weathe-block");
        let template = ``          
        for (let index = 1; index < 6; index++) {
            let day = new Date(`${data[index].datetime}`).getDay();          
            template += `<div class="day-weather">
            <div class="day">${app.getWeekDay(day)}</div>
            <div class="date">${data[index].datetime}</div>
            <div class="icon-day">
                <img src="./img/icon/${data[index].icon}.svg" alt="" srcset="">
            </div>
            <div class="weather-day">
                ${data[index].tempmax} &deg; C
            </div>
            </div>`           
        }
        weekly.insertAdjacentHTML("afterbegin", template);
    },
    getWeekDay: (date) =>{
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date];
    },
    changecity: () =>{
        let form = document.getElementById("ChangeCity");
        let city;
        form.addEventListener("submit", (e)=>{
            e.preventDefault();
            city = document.getElementById("cngCity").value;
            if(city) {
                let content = document.querySelector(".content");
                content.innerHTML = "";
                app.content();
                app.weater(city);
                localStorage.setItem("_u-city", city);
            }                   
        })
    },
    init: () =>{
        app.content();
        
        if(localStorage.getItem("_u-city"))
            app.weater(localStorage.getItem("_u-city"))        
        else 
            app.city();                

        app.changecity();
    }
}

app.init();