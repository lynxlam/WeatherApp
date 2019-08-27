//Name: GROUP 37 (Linh, Seb, Nuh, Haidar)
//WEATHER APP
//ECS522U/ECS744P - GRAPHICAL USER INTERFACES - 2018/19
//March 6th, 2019

// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone
import style from './style';
// import jquery for API calls
import $ from 'jquery';
// import tab components
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import the stylesheet for tabs
import "react-tabs/style/react-tabs.css";
import React from 'react';
//import the circle progress bar component
import Circle from 'react-circle';
import ReactDOM from 'react-dom';
//import input range component
import InputRange from 'react-input-range';
//import the stylesheet for the input range
import "react-input-range/lib/css/index.css";
//import the slick component to slide between pages
import Slider from "react-slick";
//import stylesheets for the sliding pages
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//import icon svg files
import sunIcon from "./icons/climacons-master/SVG/Sun.svg";
import moonIcon from "./icons/climacons-master/SVG/Moon.svg";
import rainIcon from "./icons/climacons-master/SVG/Cloud-Rain.svg";
import snowIcon from "./icons/climacons-master/SVG/Cloud-Snow.svg";
import hailIcon from "./icons/climacons-master/SVG/Cloud-Hail.svg";
import windIcon from "./icons/climacons-master/SVG/Wind.svg";
import fogIcon from "./icons/climacons-master/SVG/Cloud-Fog.svg"
import cloudIcon from "./icons/climacons-master/SVG/Cloud.svg"
import partCloudDayIcon from "./icons/climacons-master/SVG/Cloud-Sun.svg"
import partCloudNightIcon from "./icons/climacons-master/SVG/Cloud-Moon.svg"
import lightRainIcon from "./icons/climacons-master/SVG/Cloud-Rain-Alt.svg"
import drizzleIcon from "./icons/climacons-master/SVG/Cloud-Drizzle-Alt.svg"


var listTemp = []; //stores the temp per hour
var listFeel = []; //stores the real feel temp per hour
var listMinute = []; //stores the time in format: "hh:mm"
var listHour = []; //stores the hour in format "hhpm" or "hham"
var listWeek = []; //stores the day and date of the week: "Day, dd/mm"
var listMinutePrecipInt = []; //stores the precipitation intensity for the corresponding minute in listMinute
var listMinutePrecipProb = []; //stores the precipitation probability for the corresponding minute in listMinute
var listHourPrecipInt = []; //stores the precipitation intensity for the corresponding hour in listHour
var listHourPrecipProb = []; //stores the precipitation intensity for the corresponding hour in listHour
var listHourSummary = []; //stores the weather summary for the corresponding hour in listHour
var listHourIcon = [];  //stores the icon for the corresponding hour in listHour
var listWeekPrecipInt = []; //stores the precipitation intensity for the corresponding day in listWeek
var listWeekPrecipProb = []; //stores the precipitation probability for the corresponding day in listWeek
var listWeekSummary = []; //stores the weather summary for the corresponding day in listWeek
var listWeekIcon = []; //stores the icon for the corresponding day in listWeek
var listWeekMax = []; //stores the high temperature for the corresponding day in listWeek
var listWeekMin = []; //stores the low temperature for the corresponding day in listWeek



/*  Returns the proper background image based on the iconName given
 *
 * Function and comment by Linh */
function getBackground(iconName){
  var imgUrl;

  switch (iconName) {
     case "clear-day":
          imgUrl = {  backgroundImage: "url('../../assets/backgrounds/clear-day.jpg')" }
        break;
     case "clear-night":
          var imgUrl = {  backgroundImage: "url('../../assets/backgrounds/clear-night.jpg')" }
        break;
     case "rain":
          imgUrl = {  backgroundImage: "url('../../assets/backgrounds/rain.jpg')" }
        break;
     case "snow":
          imgUrl = {  backgroundImage: "url('../../assets/backgrounds/snow.jpg')" }
        break;
     case "sleet":
          imgUrl = {  backgroundImage: "url('../../assets/backgrounds/sleet.jpg')" }
        break;
     case  "wind":
          imgUrl = {  backgroundImage: "url('../../assets/backgrounds/wind.jpg')" }
        break;
     case "fog":
          imgUrl = {  backgroundImage: "url('../../assets/backgrounds/fog.jpg')" }
        break;
     case  "cloudy":
          imgUrl = {  backgroundImage: "url('../../assets/backgrounds/overcast.jpg')" }
        break;
     case  "partly-cloudy-day":
          imgUrl = {  backgroundImage: "url('../../assets/backgrounds/cloudy.jpg')" }
        break;
     case "partly-cloudy-night":
          imgUrl = {  backgroundImage: "url('../../assets/backgrounds/clear-night.jpg')" }
        break;
    default:
          imgUrl = {backgroundImage: "url('../../assets/backgrounds/default.jpg')"}
        break;
    }
    return imgUrl;
}

/*
 * Returns the proper weather icon based on the icon name given
 *
 * Function and comment by Seb
 */
function getIconSource(name){
  var iconSource;
  switch (name) {
     case "clear-day":
        iconSource = sunIcon;
        break;
     case "clear-night":
        iconSource = moonIcon;
        break;
     case "rain":
        iconSource = rainIcon;
        break;
     case "snow":
        iconSource = snowIcon;
        break;
     case "sleet":
        iconSource = hailIcon;
        break;
     case  "wind":
        iconSource = windIcon;
        break;
     case "fog":
        iconSource = fogIcon;
        break;
     case  "cloudy":
        iconSource = cloudIcon;
        break;
     case  "partly-cloudy-day":
        iconSource = partCloudDayIcon;
        break;
     case "partly-cloudy-night":
        iconSource = partCloudNightIcon;
        break;
    default:
      iconSource = iconSource;
    }
    return iconSource;
}
/*
 * Returns the 3 character abbreviation of a day on the week based on a number
 * from 0 - 6
 *
 * Function and comment by Seb
 */
function getDayName(day) {
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "Cannot access day...";
    }
}

/*
 * Returns the proper precipitation icon based on the intensity value within the given  time ("hour" or "day")
 *
 * Function and comment by Linh
 */
function getPrecipIcon(val, time, name){
  var icon;
  if (time == 'minute'){
         if (val > 0 && val <= 2) //if 0mm < precipitation intensity < 2mm --> light rain
            icon = lightRainIcon;
          else if (val > 2 && val <= 7) //if precipitation intensity > 7mm --> moderate rain
            icon = drizzleIcon;
          else if  (val >7)  //if precipitation intensity > 7mm --> heavy rain
            icon = rainIcon;
        else
            icon = getIconSource(listHourIcon[0]); // if no rain --> current icon
        }
        else if (time=='hour') //get hourly Icon
              icon = getIconSource(listHourIcon[name])
        else if (time=='day') //get daily Icon
              icon = getIconSource(listWeekIcon[name])

        var image = React.createElement("img", {width: "120", height: "120", src: icon, position: "relative" }) // render the icon
        return image; //return the image
    }

  /*
   * Returns the color depending on the precipitation intensity value.
   *
   * Function and comment by Linh
   */
  function getProgressColor(val){
    var color;
    if (val <= 2)
      color =  "#69f0ae"; // if light rain --> green circle
    else if (val <= 7)
      color = "#ffd740"; // if moderate rain --> yellow circle
    else
      color = "ef5350"; // if heavy rain --> red circle
    return color;
  }

  /* Converts a provided unix time stamp into the hour in the current
   * time zone, with am or pm as appropriate, and returns the string.
   *
   * Function and comment by Seb
   */
  function unixToHours(unixtimestamp) { //changed
  	var date = new Date(unixtimestamp);
  	var hour = date.getHours();
  	if (hour == 12) {return "12pm";}
  	else if (hour == 0) {return "12am";}
  	else {
  			var suffix = (hour%12 == hour) ? "am" : "pm"; //adding am-pm suffix
  			return (hour%12 + suffix);
  	}
  }
  /*
   * Converts a provided unix time stamp into a precise hh:mm formatted
   * time, and returns the string.
   *
   * Function and comment by Seb */
  function unixToMin(unixtimestamp) {
  	var date = new Date(unixtimestamp);
  	var hour = date.getHours();
    var min = date.getMinutes();
    if (min < 10 ) {
      min = "0" + min;
    }
  	if (hour == 12)
    {   suffix = "pm";
        return (hour + ":" + min + suffix);
    }
  	else if (hour == 0)
    {   suffix = "am";
        return (hour + ":" + min + suffix);
    }
  	else {
  			var suffix = (hour%12 == hour) ? "am" : "pm";
  			return (hour%12 + ':' + min+ suffix);
  	}
  }


  /*
   * The Iphone class.
   *
   * Write and comment by Linh
   *
   * Some components are added with formats and styles from Seb and Nuh */

export default class Iphone extends Component {
	// a constructor with initial set states
	constructor(props){
		super(props);
    this.fetchWeatherData();
		this.state.temp = "";
    this.state = { value: 0, valueMinute: 0, valueHour : 0, valueDay : 0 };
	}
	// a call to fetch weather data via darksky.net
	fetchWeatherData = () => {
		 var url = "https://api.darksky.net/forecast/16315489aad5e37b9196100a11b174cd/51.5074,0.1278?units=auto";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
	}

  /*
   * Renders components for the app.
   *
   * Write, edit, and comment by Linh
   *
   * Some components are added with formats and styles from Seb and Nuh */
	render() {
    const { classes } = this.props;
		 // check if temperature data is fetched, if so add the sign styling to the page
		 const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
     const tempStyles1 = this.state.temp ? `${style.temperatureMini} ${style.filled}` : style.temperature;
     const value = this.state.value;
     const valueMinute = this.state.valueMinute;
     const valueHour = this.state.valueHour;
     const valueDay = this.state.valueDay;

  /*
   * Returns all the components.
   *
   * Write by Linh
   *
   * Comment by Linh
   *
   * Some components are added with formats and styles from Seb and Nuh */

  return (
       <div class={ style.container } style={getBackground(this.state.icon)} //The container of all components
       >
         <Tabs //The tab that switches between "Today" page and "This week" page
         >
            <TabList >
              <Tab>Today</Tab>
              <Tab>This week</Tab>
            </TabList>
            <TabPanel >
            <div class={ style.header }>
                <div class={ style.city }>{ this.state.locate }</div>
                <div class={ style.conditions }>{ this.state.cond }</div>
                <span class={ tempStyles }>{ this.state.temp }</span>
                <div class={ style.city }>{ this.state.max } | { this.state.min } </div>
                 <Tabs class={style.tab} //The tab that enables users to choose between "Temperature" mode and "Real Feel" mode
                 >
                    <TabList class={style.tablinks}>
                      <Tab>Temperature</Tab>
                      <Tab>Real Feel</Tab>
                    </TabList>
                    <TabPanel >
                    <div class={style.scrolling} //Enables horizontal overflowing scroll. Shows hourly temperature with corresponding icons
                    >
                          <div class={style.card}>
                              <div class = {style.center}>Now</div>
                              <img  src={getIconSource(listHourIcon[0])} />
                              <div class = {style.center}>{listTemp[0]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[1]}</div>
                              <img  src={getIconSource(listHourIcon[1])} />
                              <div class = {style.center}>{listTemp[1]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[2]}</div>
                              <img  src={getIconSource(listHourIcon[2])} />
                              <div class = {style.center}>{listTemp[2]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[3]}</div>
                              <img  src={getIconSource(listHourIcon[3])} />
                              <div class = {style.center}>{listTemp[3]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[4]}</div>
                              <img  src={getIconSource(listHourIcon[4])} />
                              <div class = {style.center}>{listTemp[4]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[5]}</div>
                              <img  src={getIconSource(listHourIcon[5])} />
                              <div class = {style.center}>{listTemp[5]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[6]}</div>
                              <img  src={getIconSource(listHourIcon[6])} />
                              <div class = {style.center}>{listTemp[6]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[7]}</div>
                              <img  src={getIconSource(listHourIcon[7])} />
                              <div class = {style.center}>{listTemp[7]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[8]}</div>
                              <img  src={getIconSource(listHourIcon[8])} />
                              <div class = {style.center}>{listTemp[8]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[9]}</div>
                              <img  src={getIconSource(listHourIcon[9])} />
                              <div class = {style.center}>{listTemp[9]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[10]}</div>
                              <img  src={getIconSource(listHourIcon[10])} />
                              <div class = {style.center}>{listTemp[10]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[11]}</div>
                              <img  src={getIconSource(listHourIcon[11])} />
                              <div class = {style.center}>{listTemp[11]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[12]}</div>
                              <img  src={getIconSource(listHourIcon[12])} />
                              <div class = {style.center}>{listTemp[12]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[13]}</div>
                              <img  src={getIconSource(listHourIcon[13])} />
                              <div class = {style.center}>{listTemp[13]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[14]}</div>
                              <img  src={getIconSource(listHourIcon[14])} />
                              <div class = {style.center}>{listTemp[14]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[15]}</div>
                              <img  src={getIconSource(listHourIcon[15])} />
                              <div class = {style.center}>{listTemp[15]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[16]}</div>
                              <img  src={getIconSource(listHourIcon[16])} />
                              <div class = {style.center}>{listTemp[16]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[17]}</div>
                              <img  src={getIconSource(listHourIcon[17])} />
                              <div class = {style.center}>{listTemp[17]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[18]}</div>
                              <img  src={getIconSource(listHourIcon[18])} />
                              <div class = {style.center}>{listTemp[18]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[19]}</div>
                              <img  src={getIconSource(listHourIcon[19])} />
                              <div class = {style.center}>{listTemp[19]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[20]}</div>
                              <img  src={getIconSource(listHourIcon[20])} />
                              <div class = {style.center}>{listTemp[20]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[21]}</div>
                              <img  src={getIconSource(listHourIcon[21])} />
                              <div class = {style.center}>{listTemp[21]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[22]}</div>
                              <img  src={getIconSource(listHourIcon[22])} />
                              <div class = {style.center}>{listTemp[22]}</div>
                          </div>
                          <div class={style.card}>
                              <div class = {style.center}>{listHour[23]}</div>
                              <img  src={getIconSource(listHourIcon[23])} />
                              <div class = {style.center}>{listTemp[23]}</div>
                          </div>
                      </div>
                     </TabPanel>
                     <TabPanel >
                     <div class={style.scrolling} //Enables horizontal overflowing scroll. Shows hourly real-feel temperature with corresponding icons
                     >
                           <div class={style.card}>
                               <div class = {style.center}>Now</div>
                               <img  src={getIconSource(listHourIcon[0])} />
                               <div class = {style.center}>{listFeel[0]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[1]}</div>
                               <img  src={getIconSource(listHourIcon[1])} />
                               <div class = {style.center}>{listFeel[1]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[2]}</div>
                               <img  src={getIconSource(listHourIcon[2])} />
                               <div class = {style.center}>{listFeel[2]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[3]}</div>
                               <img  src={getIconSource(listHourIcon[3])} />
                               <div class = {style.center}>{listFeel[3]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[4]}</div>
                               <img  src={getIconSource(listHourIcon[4])} />
                               <div class = {style.center}>{listFeel[4]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[5]}</div>
                               <img  src={getIconSource(listHourIcon[5])} />
                               <div class = {style.center}>{listFeel[5]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[6]}</div>
                               <img  src={getIconSource(listHourIcon[6])} />
                               <div class = {style.center}>{listFeel[6]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[7]}</div>
                               <img  src={getIconSource(listHourIcon[7])} />
                               <div class = {style.center}>{listFeel[7]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[8]}</div>
                               <img  src={getIconSource(listHourIcon[8])} />
                               <div class = {style.center}>{listFeel[8]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[9]}</div>
                               <img  src={getIconSource(listHourIcon[9])} />
                               <div class = {style.center}>{listFeel[9]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[10]}</div>
                               <img  src={getIconSource(listHourIcon[10])} />
                               <div class = {style.center}>{listFeel[10]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[11]}</div>
                               <img  src={getIconSource(listHourIcon[11])} />
                               <div class = {style.center}>{listFeel[11]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[12]}</div>
                               <img  src={getIconSource(listHourIcon[12])} />
                               <div class = {style.center}>{listFeel[12]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[13]}</div>
                               <img  src={getIconSource(listHourIcon[13])} />
                               <div class = {style.center}>{listFeel[13]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[14]}</div>
                               <img  src={getIconSource(listHourIcon[14])} />
                               <div class = {style.center}>{listFeel[14]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[15]}</div>
                               <img  src={getIconSource(listHourIcon[15])} />
                               <div class = {style.center}>{listFeel[15]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[16]}</div>
                               <img  src={getIconSource(listHourIcon[16])} />
                               <div class = {style.center}>{listFeel[16]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[17]}</div>
                               <img  src={getIconSource(listHourIcon[17])} />
                               <div class = {style.center}>{listFeel[17]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[18]}</div>
                               <img  src={getIconSource(listHourIcon[18])} />
                               <div class = {style.center}>{listFeel[18]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[19]}</div>
                               <img  src={getIconSource(listHourIcon[19])} />
                               <div class = {style.center}>{listFeel[19]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[20]}</div>
                               <img  src={getIconSource(listHourIcon[20])} />
                               <div class = {style.center}>{listFeel[20]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[21]}</div>
                               <img  src={getIconSource(listHourIcon[21])} />
                               <div class = {style.center}>{listFeel[21]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[22]}</div>
                               <img  src={getIconSource(listHourIcon[22])} />
                               <div class = {style.center}>{listFeel[22]}</div>
                           </div>
                           <div class={style.card}>
                               <div class = {style.center}>{listHour[23]}</div>
                               <img  src={getIconSource(listHourIcon[23])} />
                               <div class = {style.center}>{listFeel[23]}</div>
                           </div>
                       </div>
                     </TabPanel>
                   </Tabs>
                   <Slider>
                       <div>
                         <Tabs class={style.tab} // The tab that enables users to view detailed precipitation info in 3 time-frame: Minutely, Hourly, Daily
                         >
                             <TabList class={style.tablinks}>
                               <Tab>Minutely</Tab>
                               <Tab>Hourly</Tab>
                               <Tab>Daily</Tab>
                             </TabList>
                             <TabPanel >
                               <div class={ style.conditions }>{ this.state.min_cond }</div>
                               <div class={style.back}>
                                   <div class={style.overlay}>
                                       {getPrecipIcon(listMinutePrecipInt[valueMinute], 'minute')}
                                   </div>
                                   <Circle //Dynamically shows minutely precipitation info with corresponding probability, intensity, and icon
                                         progress= {listMinutePrecipProb[valueMinute]} // String: Update to change the progress and percentage (chance of rain)
                                         progressColor= {getProgressColor(listMinutePrecipInt[valueMinute])} //The color of the circle depends on the precipitation intensity
                                   />
                                   </div>
                                   <InputRange //Slide to choose the time value
                                         formatLabel={value => `${listMinute[value]}`}
                                         maxValue={59} // max value: 59 mins from now
                                         minValue={0} //min value: Now
                                         value={this.state.valueMinute} //value of the input range
                                         onChange={valueMinute => this.setState({ valueMinute })} //change the input value as users slide the bar
                                   />
                             </TabPanel>
                             <TabPanel >
                                <div class={ style.conditions}> {listHourSummary[valueHour]}</div>
                                 <div class={style.back}>
                                     <div class={style.overlay}>
                                     {getPrecipIcon(listHourPrecipInt[valueHour], "hour", valueHour)}
                                     </div>
                                  <Circle  //Dynamically shows hourly precipitation info with corresponding probability, intensity, and icon
                                      progress= {listHourPrecipProb[valueHour]} // String: Update to change the progress and percentage (chance of rain)
                                      progressColor= {getProgressColor(listHourPrecipInt[valueHour])} //The color of the circle depends on the precipitation intensity
                                   />
                                   </div>
                                     <InputRange //Slide to choose the time value
                                         formatLabel={value => `${listHour[value]}`}
                                         maxValue={23} //max value: 24hrs from now
                                         minValue={0} //min vallue: Now
                                         value={this.state.valueHour} //value of the input range
                                         onChange={valueHour => this.setState({ valueHour })} //change the input value as users slide the bar
                                     />
                             </TabPanel>
                             <TabPanel >
                                  <div class={ style.conditions}> {listWeekSummary[valueDay]}</div>
                                  <div class={style.back}>
                                       <div class={style.overlay}>
                                       {getPrecipIcon(listWeekPrecipInt[valueDay],"day", valueDay)}
                                       </div>
                                    <Circle //Dynamically shows weekly precipitation info with corresponding probability, intensity, and icon
                                        progress= {listWeekPrecipProb[valueDay]} // String: Update to change the progress and percentage (chance of rain)
                                        progressColor= {getProgressColor(listWeekPrecipInt[valueDay])} //The color of the circle depends on the precipitation intensity
                                     />
                                     </div>
                                     <InputRange //Slide to choose the time value
                                        formatLabel={value => `${listWeek[value]}`} //edited to show the day's name (Seb)
                                         maxValue={6} //max value: 7 days from now
                                         minValue={0} //min value: today
                                         value={this.state.valueDay} //value of the input range
                                         onChange={valueDay => this.setState({ valueDay })} //change the input value as users slide the bar
                                     />
                             </TabPanel>
                         </Tabs>
                         <div class={style.conditions} style={{'margin-top': '10px'}}> Precipitation Info</div>

                         </div>
                   <div>
                       <div class={style.row} // Shows more current weather info:
                       //Sunrise/Sunset time, precipitation probability & intensity, wind speed, humidity, pressure, UV Index, visibility, dew point
                       >
                           <div class={style.column}>
                             <div class={style.categoryTitle}>SUNRISE TIME</div>
                             <div class={ style.categoryDetail }>{ this.state.sunrise }</div>
                             <div class={style.categoryTitle}>PRECIPITATION PROBABILITY</div>
                             <div class={ style.categoryDetail }>{ this.state.prepProbability }</div>
                             <div class={style.categoryTitle}>WIND SPEED</div>
                             <div class={ style.categoryDetail }>{ this.state.windSpeed }</div>
                             <div class={style.categoryTitle}>HUMIDITY</div>
                             <div class={ style.categoryDetail }>{ this.state.humidity }</div>
                             <div class={style.categoryTitle}>PRESSURE</div>
                             <div class={ style.categoryDetail }>{ this.state.pressure }</div>
                           </div>
                           <div class={style.column}>
                             <div class={style.categoryTitle}>SUNSET TIME </div>
                             <div class={ style.categoryDetail }>{ this.state.sunset }</div>
                             <div class={style.categoryTitle}>PRECIPITATION INTENSITY</div>
                             <div class={ style.categoryDetail }>{ this.state.prepIntensity }</div>
                             <div class={style.categoryTitle}>UV INDEX</div>
                             <div class={ style.categoryDetail }>{ this.state.uvIndex }</div>
                             <div class={style.categoryTitle}>VISIBILITY</div>
                             <div class={ style.categoryDetail }>{ this.state.visibility }</div>
                             <div class={style.categoryTitle}>DEWPOINT</div>
                             <div class={ style.categoryDetail }>{ this.state.dewPoint }</div>
                           </div>
                       </div>
                   </div>
                 </Slider>
                 </div>
             </TabPanel>
             <TabPanel //This tab shows daily weather states of the next 7 days in blocks including date, summary, icon, max/min temperature, precipitation probability
             >
             <div class = {style.block}>
               <span class = {style.city1}>	{ this.state.locate }</span><span class = {style.subHead}> {this.state.weekCondition} </span><br/>
               <div class = {style.precipitationName}> Precipitation</div>
             </div>

             <div class = {style.overflow}>
             <div class = {style.block}>
                 <span class = {style.date}>
                     {listWeek[0]}
                 </span>
                 <span class= {style.description}> {listWeekSummary[0]} </span>
                 <span class = {style.img}><img src={getIconSource(listWeekIcon[0])} width="80" height="80"/></span>
                 <span class = {style.weather}>{listWeekMax[0]} | {listWeekMin[0]}
                     <span class = {style.weekPrecipitation}> {listWeekPrecipProb[0]}%</span>
                 </span>
                 <br/>
             </div>
             <div class = {style.block}>
                 <span class = {style.date}>
                     {listWeek[1]}
                 </span>
                 <span class= {style.description}> {listWeekSummary[1]} </span>
                 <span class = {style.img}><img src={getIconSource(listWeekIcon[1])} width="80" height="80"/></span>
                 <span class = {style.weather}>{listWeekMax[1]} | {listWeekMin[1]}
                     <span class = {style.weekPrecipitation}> {listWeekPrecipProb[1]}%</span>
                 </span>
                 <br/>
             </div>
             <div class = {style.block}>
                 <span class = {style.date}>
                     {listWeek[2]}
                 </span>
                 <span class= {style.description}> {listWeekSummary[2]} </span>
                 <span class = {style.img}><img src={getIconSource(listWeekIcon[2])} width="80" height="80"/></span>
                 <span class = {style.weather}>{listWeekMax[2]} | {listWeekMin[2]}
                     <span class = {style.weekPrecipitation}> {listWeekPrecipProb[2]}%</span>
                 </span>
                 <br/>
             </div>
             <div class = {style.block}>
                 <span class = {style.date}>
                     {listWeek[3]}
                 </span>
                 <span class= {style.description}> {listWeekSummary[3]} </span>
                 <span class = {style.img}><img src={getIconSource(listWeekIcon[3])} width="80" height="80"/></span>
                 <span class = {style.weather}>{listWeekMax[3]} | {listWeekMin[3]}
                     <span class = {style.weekPrecipitation}> {listWeekPrecipProb[3]}%</span>
                 </span>
                 <br/>
             </div>
             <div class = {style.block}>
                 <span class = {style.date}>
                     {listWeek[4]}
                 </span>
                 <span class= {style.description}> {listWeekSummary[4]} </span>
                 <span class = {style.img}><img src={getIconSource(listWeekIcon[4])} width="80" height="80"/></span>
                 <span class = {style.weather}>{listWeekMax[4]} | {listWeekMin[4]}
                     <span class = {style.weekPrecipitation}> {listWeekPrecipProb[4]}%</span>
                 </span>
                 <br/>
             </div>
             <div class = {style.block}>
                 <span class = {style.date}>
                     {listWeek[5]}
                 </span>
                 <span class= {style.description}> {listWeekSummary[5]} </span>
                 <span class = {style.img}><img src={getIconSource(listWeekIcon[5])} width="80" height="80"/></span>
                 <span class = {style.weather}>{listWeekMax[5]} | {listWeekMin[5]}
                     <span class = {style.weekPrecipitation}> {listWeekPrecipProb[5]}%</span>
                 </span>
                 <br/>
             </div>
             <div class = {style.block}>
                 <span class = {style.date}>
                     {listWeek[6]}
                 </span>
                 <span class= {style.description}> {listWeekSummary[6]} </span>
                 <span class = {style.img}><img src={getIconSource(listWeekIcon[6])} width="80" height="80"/></span>
                 <span class = {style.weather}>{listWeekMax[6]} | {listWeekMin[6]}
                     <span class = {style.weekPrecipitation}> {listWeekPrecipProb[6]}%</span>
                 </span>
                 <br/>
             </div>
             </div>
             </TabPanel>
           </Tabs>
       </div>
       );
   } //END OF RENDER()


   //Parse the API responses
	parseResponse = (parsed_json) => {

    //update all the current weather data
		var location = parsed_json['timezone']; //location
		var temp_c = Math.ceil(parsed_json['currently']['temperature']); // current temperature
		var conditions = parsed_json['currently']['summary']; //current weather state
		var real_feel = Math.ceil(parsed_json['currently']['apparentTemperature']); //current apparent (real-feel) temperature
		var temp_max = Math.ceil(parsed_json['daily']['data'][0]['temperatureMax']); //daily max temperature
		var temp_min = Math.ceil(parsed_json['daily']['data'][0]['temperatureMin']); // daily min temperature
		var minute_condition = parsed_json['minutely']['summary']; //minutely weather summary
    var sunrise = (unixToMin((parsed_json['daily']['data'][0]['sunriseTime']*1000))); //daily sunrise time (properly formatted)
    var sunset = (unixToMin((parsed_json['daily']['data'][0]['sunsetTime']*1000))) //daily sunset time (properly formatted)
    var dewP = parsed_json['currently']['dewPoint']; //current dew point
    var uv = parsed_json['currently']['uvIndex']; //current UV Index
    var humidity = parsed_json['currently']['humidity']; //current humidity
    var pressure = parsed_json['currently']['pressure']; //current pressure
    var windSpeed = parsed_json['currently']['windSpeed']; //current wind speed
    var visibility = parsed_json['currently']['visibility']; //current visibility
    var prepIntensity = parsed_json['currently']['precipIntensity']; //current precipitation intensity
    var prepProb = parsed_json['currently']['precipProbability']; //current precipitation probability
    var icon = parsed_json['currently']['icon']; //current weather icon

    var weekCond = parsed_json['daily']['summary']; //weather summary for the whole week

    //add hourly data to the arrays
		for (var i = 0; i < 24; i++){
			var hour = (unixToHours((parsed_json['hourly']['data'][i]['time']*1000))); //24 next hours
      listHour.push(hour);
      var temp = Math.ceil(parsed_json['hourly']['data'][i]['temperature']); //hourly temperature
      listTemp.push(temp + "°");
      var feel = Math.ceil(parsed_json['hourly']['data'][i]['apparentTemperature']); //hourly apparent temperature
      listFeel.push(feel + "°");
      var iconName = (parsed_json['hourly']['data'][i]['icon']); //hourly weather icon
      listHourIcon.push(iconName);
      var iconSource = getIconSource(iconName);
      var hourPrecipInt = parsed_json['hourly']['data'][i]['precipIntensity']; //hourly precipitation intensity
      listHourPrecipInt.push(hourPrecipInt);
      var hourPrecipProb = Math.ceil(parsed_json['hourly']['data'][i]['precipProbability']*100); //hourly precipitation probability
      listHourPrecipProb.push(hourPrecipProb);
      var hourSummary = parsed_json['hourly']['data'][i]['summary']; //hourly weather state
      listHourSummary.push(hourSummary);

		}

    //add weekly data to the arrays
    for (var i = 0; i < 7; i++){
      var date = (new Date (parsed_json['daily']['data'][i]['time']*1000)); //formatted days during a week
			var day = date.getDay();
			listWeek.push(getDayName(day) + ", " + date.getDate() + "/" + (date.getMonth() + 1)); //date format for the label
      var weekPrecipInt = parsed_json['daily']['data'][i]['precipIntensity']; //daily precipitation intensity
      listWeekPrecipInt.push(weekPrecipInt);
      var weekPrecipProb = Math.ceil(parsed_json['daily']['data'][i]['precipProbability']*100); //daily precipitation probability
      listWeekPrecipProb.push(weekPrecipProb);
      var weekSummary = parsed_json['daily']['data'][i]['summary']; //daily weather summary
      listWeekSummary.push(weekSummary);
      var iconName = (parsed_json['daily']['data'][i]['icon']); //daily weather icon
      listWeekIcon.push(iconName);
      var temp_max = Math.ceil(parsed_json['daily']['data'][i]['temperatureMax']); //daily max temperature
      listWeekMax.push(temp_max + "°");
      var temp_min = Math.ceil(parsed_json['daily']['data'][i]['temperatureMin']); //daily min temperature
      listWeekMin.push(temp_min + "°");

		}

    //add minutely data to the arrays
    for (var i = 0; i < 60; i++){
      var minute = (new Date (parsed_json['minutely']['data'][i]['time']*1000).getMinutes()); //formatted date
      listMinute.push(unixToMin(parsed_json['minutely']['data'][i]['time']*1000)); //formatted minute [hh:mm]
      var minutePrecipInt = parsed_json['minutely']['data'][i]['precipIntensity']; //minutely precipitation intensity
      listMinutePrecipInt.push(minutePrecipInt);
      var minutePrecipProb = Math.ceil(parsed_json['minutely']['data'][i]['precipProbability']*100); //minutely precipitation probability
      listMinutePrecipProb.push(minutePrecipProb);

    }
		this.setState({ //updates the current state of our app based on parsed data
			locate: location,
			temp: temp_c,
			cond : conditions,
			feel: real_feel,
			max:  temp_max + "°",
			min: temp_min + "°",
			min_cond: minute_condition,
      sunrise: sunrise,
      sunset: sunset,
      dewPoint: dewP,
      uvIndex: uv,
      windSpeed: windSpeed,
      humidity: humidity,
      pressure: pressure,
      visibility: visibility,
      prepIntensity: prepIntensity,
      prepProbability: prepProb,
      icon: icon,
      weekCondition: weekCond,
		});
	}
}
