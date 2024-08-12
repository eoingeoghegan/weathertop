import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import axios from "axios";
const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=Clare,Ireland&units=metric&appid=04dc74cc03bcbcc6cdf06dcbaa070d0d`;
const apiKey = "04dc74cc03bcbcc6cdf06dcbaa070d0d";


// The station view locates the station by id that has been added, the reports entered saved by the stations Id and the latestReport entered by locating the report at index[0].
// This info thats located and added to the viewData so it can then be render for the user. The station view controls the layout of the info.
// The if statements work by displaying certain information/icons depending on what information the user enters also the same with the cases
export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const reports = await reportStore.getReportsByStationId(station._id);
    const latestReport = reports[0];
    
    let report = {};
    const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${station.title},Ireland&units=metric&appid=04dc74cc03bcbcc6cdf06dcbaa070d0d`;

    const result = await axios.get(weatherRequestUrl);
    if (result.status == 200) {
      const currentWeather = result.data;
      report.code = currentWeather.weather[0].id;
      report.temperature = currentWeather.main.temp;
      report.windSpeed = currentWeather.wind.speed;
      report.pressure = currentWeather.main.pressure;
      report.windDirection = currentWeather.wind.deg;
    }
    
    const forecastRequestUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${station.title},Ireland&units=metric&appid=${apiKey}`;
    const forecastResult = await axios.get(forecastRequestUrl)
      if(result.status ==200){ 
      //5 day forecast report
      //console.log(JSON.stringify(result.data, null, 2));
      report.tempTrend = [];
      report.trendLabels = [];
      const trends = forecastResult.data.list;
      for(let i =0; i <10; i++) {
        report.tempTrend.push(trends[i].main.temp);
        report.trendLabels.push(trends[i].dt_txt);
      }
    }
   
    let maxPressure = "";
    let minPressure = "";
     
    if (latestReport) {
      if(latestReport.pressure >= 900 && latestReport.pressure <= 950) {
        maxPressure = 950;
        minPressure = 900;
      }else if(latestReport.pressure >= 951 && latestReport.pressure <= 1000) {
        maxPressure = 100;
        minPressure = 950;
      } else if(latestReport.pressure >= 1001 && latestReport.pressure <= 1050) {
        maxPressure = 1050;
        minPressure = 1000;
      }
    }
     
    
    let minWind = "";
    let maxWind = ""; 
    if(latestReport) {
      if (latestReport.windSpeed >= 0 && latestReport.windSpeed <=0.99){
        minWind = 0.5;
        maxWind = 1;
      } else if (latestReport.windSpeed >= 1 && latestReport.windSpeed <=1.99){
        minWind = 1;
        maxWind = 3;
      } else if (latestReport.windSpeed >= 2 && latestReport.windSpeed <=2.99){
        minWind = 4;
        maxWind = 7;
    }  else if (latestReport.windSpeed >= 3 && latestReport.windSpeed <=3.99){
        minWind = 8;
        maxWind = 12;
    }  else if (latestReport.windSpeed >= 4 && latestReport.windSpeed <=4.99){
        minWind = 13;
        maxWind = 18;
    }  else if (latestReport.windSpeed >= 5 && latestReport.windSpeed <=5.99){
        minWind = 19;
        maxWind =24;
    }  else if (latestReport.windSpeed >= 6 && latestReport.windSpeed <=6.99){
        minWind = 25;
        maxWind = 31;
    }  else if (latestReport.windSpeed >= 7 && latestReport.windSpeed <=7.99){
        minWind = 32;
        maxWind = 38;
    }  else if (latestReport.windSpeed >= 8 && latestReport.windSpeed <=8.99){
        minWind = 39;
        maxWind = 46;
    }  else if (latestReport.windSpeed >= 9 && latestReport.windSpeed <=9.99){
        minWind = 47;
        maxWind = 54;
    } 
      
    }
    let windKmh = "";
      if(latestReport) {
        windKmh = latestReport.windSpeed * 1.6;
    }
     
    let windDeg = "";
    
    if (latestReport) {
      if (latestReport.windDirection >=350 && latestReport.windDirection <= 360 && latestReport.windDirection || latestReport.windDirection >=10 && latestReport.windDirection <=19) {
        windDeg = 'N';
      } else if (latestReport.windDirection >=20 && latestReport.windDirection <=30 ){
        windDeg = 'NNE'
    } else if (latestReport.windDirection >=40 && latestReport.windDirection <=50) {
        windDeg = 'NE';
    } else if (latestReport.windDirection >=60 && latestReport.windDirection <=60) {
        windDeg = 'ENE';
    } else if (latestReport.windDirection >=80 && latestReport.windDirection <=100) {
        windDeg = 'E';
    } else if (latestReport.windDirection >=110 && latestReport.windDirection <=120) {
        windDeg = 'ESE';
    } else if (latestReport.windDirection >=130 && latestReport.windDirection <=140) {
        windDeg = 'SE';
    } else if (latestReport.windDirection >=150 && latestReport.windDirection <=160) {
        windDeg = 'SSE';
    } else if (latestReport.windDirection >=170 && latestReport.windDirection <=190) {
        windDeg = "S";
    } else if (latestReport.windDirection >=200 && latestReport.windDirection <=210) {
        windDeg = 'SWS';
    } else if (latestReport.windDirection >=220 && latestReport.windDirection <=230) {
        windDeg = 'SW';
    } else if (latestReport.windDirection >=240 && latestReport.windDirection <=250) {
        windDeg = 'WSW';
    } else if (latestReport.windDirection >=260 && latestReport.windDirection <=280) {
        windDeg = 'W';
    } else if (latestReport.windDirection >=290 && latestReport.windDirection <=300) {
        windDeg ='WNW';
    } else if (latestReport.windDirection >=310 && latestReport.windDirection <=320) {
        windDeg = 'NW';
    } else if (latestReport.windDirection >=330 && latestReport.windDirection <=340) {
        windDeg = 'NNW';
    } 
    }
    
    let minTemp = "";
    let maxTemp = "";
      
    
    if(latestReport) {
      if (latestReport.temperature >= 0 && latestReport.temperature <= 4){
        minTemp = 0;
        maxTemp = 4;
      }
     else if (latestReport.temperature >= 5 && latestReport.temperature <= 9){
        minTemp = 5;
        maxTemp = 9;
      }  else if (latestReport.temperature >= 10 && latestReport.temperature <= 14){
        minTemp = 10;
        maxTemp = 14;
      }  else if (latestReport.temperature >= 15 && latestReport.temperature <= 19){
        minTemp = 15;
        maxTemp = 19;
      } else if (latestReport.temperature >= 20 && latestReport.temperature <= 25){
         minTemp = 20;
        maxTemp = 25;
      } else if (latestReport.temperature >= 26 && latestReport.temperature <= 30){
         minTemp = 26;
        maxTemp = 30;
      } else if (latestReport.temperature >= 31 && latestReport.temperature <= 35){
         minTemp = 31;
        maxTemp = 35;
      } else if (latestReport.temperature >= 36 && latestReport.temperature <= 40){
         minTemp = 36;
        maxTemp = 40;
      }
      
    }
  
    
    
    
   let weatherIcon = ""; 
    let weather = "unknown";
    
    if (latestReport) {
      if (latestReport.code >= 200 && latestReport.code <= 232) {
        weatherIcon = "https://cdn.glitch.global/4f8dd324-2430-43fc-b3bb-1233580166d0/day-night-thunderstorm.png?v=1719312022225";
      } else if(latestReport.code >=300 && latestReport.code <=321) {
          weatherIcon = "https://cdn.glitch.global/4f8dd324-2430-43fc-b3bb-1233580166d0/day-night-shower-rain.png?v=1719311834833";
        } else if(latestReport.code >=500 && latestReport.code <=504) {
          weatherIcon = "https://cdn.glitch.global/4f8dd324-2430-43fc-b3bb-1233580166d0/day-rain.png?v=1719311985443";
          } else if(latestReport.code >=520 && latestReport.code <=531) {
          weatherIcon = "https://cdn.glitch.global/4f8dd324-2430-43fc-b3bb-1233580166d0/night-rain.png?v=1719312007357";
            } else if(latestReport.code >=600 && latestReport.code <=621) {
          weatherIcon = "https://cdn.glitch.global/4f8dd324-2430-43fc-b3bb-1233580166d0/day-night-snow.png?v=1719312049045";
              } else if(latestReport.code >=701 && latestReport.code <=781) {
          weatherIcon = "https://cdn.glitch.global/4f8dd324-2430-43fc-b3bb-1233580166d0/day-night-mist.png?v=1719312080871";
                 } else if(latestReport.code ===800) {
          weatherIcon = "https://cdn.glitch.global/4f8dd324-2430-43fc-b3bb-1233580166d0/day-clear-sky.png?v=1719311663673";
                 } else if(latestReport.code >=801 && latestReport.code <=804) {
          weatherIcon = "https://cdn.glitch.global/4f8dd324-2430-43fc-b3bb-1233580166d0/day-night-scattered-clouds.png?v=1719311761921";
                
      }
      switch (latestReport.code) {
        case 200:
          weather = "Thunder Storm with light rain";
          break;
        case 201:
          weather = "Thunder Storm with rain";
          break;
        case 202:
          weather = "Thunderstorm with heavy rain";
          break;
        case 210:
          weather = "Thunderstorm	light thunderstorm";
          break;
        case 211:
          weather = "Thunderstorm	thunderstorm";
          break;
        case 212:
          weather = "Thunderstorm	heavy thunderstorm";
          break;
        case 221:
          weather = "Thunderstorm	ragged thunderstorm";
          break;
        case 230:	weather = "Thunderstorm	thunderstorm with light drizzle";
          break;
        case 231:	weather = "Thunderstorm	thunderstorm with drizzle";
          break;
        case 232:	weather = "Thunderstorm	thunderstorm with heavy drizzle";
          break;

        case 300:	weather =	"	light intensity drizzle";
          break;
        case 301:	weather =	"	drizzle";
          break;
        case 302:	weather =	"	heavy intensity drizzle";
          break;
        case 310:	weather =	"	light intensity drizzle rain";
          break;
        case 311:	weather =	"	drizzle rain";
          break;
        case 312:	weather =	"	heavy intensity drizzle rain";
          break;
        case 313:	weather =	"	shower rain and drizzle";
          break;
        case 314:	weather =	"	heavy shower rain and drizzle";
          break;
        case 321:	weather =	"	shower drizzle";
          break;

        case 500:	weather =	"	Rain	light rain";
          break;
        case 501:	weather =	"	Rain	moderate rain";
          break;
        case 502:	weather =	"	Rain	heavy intensity rain";
          break;
        case 503:	weather =	"	Rain	very heavy rain";
          break;
        case 504:	weather =	"	Rain	extreme rain";
          break;
        case 511:	weather =	"	Rain	freezing rain";
          break;
        case 520:	weather =	"	Rain	light intensity shower rain";
          break;
        case 521:	weather =	"	Rain	shower rain";
          break;
        case 522:	weather =	"	Rain	heavy intensity shower rain";
          break;
        case 531:	weather =	"	Rain	ragged shower rain";
          break;


        case 600:	weather =	"	Snow	light snow";
          break;
        case 601:	weather =	"	Snow	snow";
          break;
        case 602:	weather =	"	Snow	heavy snow";
          break;
        case 611:	weather =	"	Snow	sleet";
          break;
        case 612:	weather =	"	Snow	light shower sleet";
          break;
        case 613:	weather =	"	Snow	shower sleet";
          break;
        case 615:	weather =	"	Snow	light rain and snow";
          break;
        case 616:	weather =	"	Snow	rain and snow";
          break;
        case 620:	weather =	"	Snow	light shower snow";
          break;
        case 621:	weather =	"	Snow	shower snow";
          break;
        case 622:	weather =	"	Snow	heavy shower snow";
          break;
        case 701:	weather =	"	Mist	mist";
          break;
        case 711:	weather =	"	Smoke	smoke";
          break;
        case 721:	weather =	"	Haze	haze";
          break;
        case 731:	weather =	"	Dust	sand/dust whirls";
          break;
        case 741:	weather =	"	Fog	fog";
          break;
        case 751:	weather =	"	Sand	sand";
          break;
        case 761:	weather =	"	Dust	dust";
          break;
        case 762:	weather =	"	Ash	volcanic ash";
          break;
        case 771:	weather =	"	Squall	squalls";
          break;
        case 781:	weather =	"	Tornado	tornado";
          break;
        case 800:	weather =	"	Clear	clear sky";
          break;
        case 801:	weather =	"	Few Clouds";
          break;
        case 802:	weather =	"	Scattered Clouds";
          break;
        case 803:	weather =	"	Broken Clouds";
          break;
        case 804:	weather =	"	Overcast Clouds";
          break;
        default:
          weather = "unknown";
       
      }    
      console.log("Weather code:", latestReport.code, "is", weather);
    
    }

    const viewData = {
      title: "Station",
      station: station,
      reports: reports,
      latestReport: latestReport,
      weather: weather,
      weatherIcon: weatherIcon,
      minTemp: minTemp,
      maxTemp: maxTemp,
      maxWind: maxWind,
      minWind: minWind,
      windKmh: windKmh,
      windDeg: windDeg,
      maxPressure: maxPressure,
      minPressure: minPressure,
      reading: report,
      
      
    };
    
    console.log(latestReport),
    response.render("station-view", viewData);
      
  },
  
// This works by getting the users station by Id from the store. The user then enteres the data and submits it.
// The info is then brought to the reportStore to the addReport function and gets added to the stations Id as a newReport.
// The timestamp records the time and date the entry was recorded.
  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    
    
    //tried if the weather added is manual or the current that it will display either depending on the button pressed, which worked.
    let report = {};
    const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${station.title},Ireland&units=metric&appid=04dc74cc03bcbcc6cdf06dcbaa070d0d`;

    const result = await axios.get(weatherRequestUrl);
    if (result.status == 200) {
      const currentWeather = result.data;
   
    const newReport = {
      code: Number(request.body.code) || currentWeather.weather[0].id,
      temperature: Number(request.body.temperature) || currentWeather.main.temp,
      windSpeed: Number(request.body.windSpeed) || currentWeather.wind.speed,
      windDirection: request.body.windDirection || currentWeather.wind.deg,
      pressure: Number(request.body.pressure) ||currentWeather.main.pressure , 
      timestamp: new Date().toISOString(),
    }
    
  
     
    console.log(`adding report ${newReport.code}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  }
  },
// The stationId and reportId are requested, it then goes to the reportStore deleteReport function and executes this.
// The user is then redirected to the station view with stationsID.
  async deleteReport (request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting report ${reportId} from station ${stationId}`);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
  },
};

