const wmo_code = {
  0: "Clear Sky",
  1: "Partly cloudy",
  2: "Partly cloudy",
  3: "Partly cloudy",
  45: "Fog",
  48: "Fog",
  51: "Drizzle",
  53: "Drizzle",
  55: "Drizzle",
  56: "Freezing Drizzle",
  57: "Freezing Drizzle",
  61: "Rain",
  63: "Rain",
  65: "Rain",
  66: "Freezing Rain",
  67: "Freezing Rain",
  71: "Snow Fall",
  73: "Snow Fall",
  75: "Snow Fall",
  77: "Snow Grains",
  80: "Rain Showers",
  81: "Rain Showers",
  82: "Rain Showers",
  85: "Snow Showers",
  86: "Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};
async function fetchLatiLongi(cityName) {
  try {
    console.log(cityName === undefined);
    if (!cityName) {
      throw new Error("Invalid entry");
    }
    const geolocation = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`,
    );
    if (!geolocation.ok) {
      throw new Error("Invalid data");
    }
    const location = await geolocation.json();
    if (!location || !location.results) {
      console.log(location);
      throw new Error("Invalid data");
    }
    const [{ name, latitude, longitude }] = location.results;
    // if(!name)
    const newobj = { name, latitude, longitude };
    if (!newobj.name || !newobj.latitude || !newobj.longitude) {
      throw new Error("Missing field");
    }
    console.log(newobj);
    return newobj;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function getWeatherData(obj) {
  try {
    const data = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${obj.latitude}&longitude=${obj.longitude}&current=temperature_2m,weather_code,wind_speed_10m`,
    );
    if (!data.ok) {
      throw new Error("Http error");
    }
    const formattedData = await data.json();
    console.log(formattedData);
    const jsonData = {
      temperature: formattedData["current"].temperature_2m,
      weather_code: wmo_code[formattedData["current"].weather_code],
      wind_speed: formattedData["current"].wind_speed_10m,
      name: obj["name"],
    };
    console.log(jsonData);
    return jsonData;
  } catch (err) {
    console.error(err);
  }
}
// fetchLatiLongi('kannur').catch((err)=>{console.error(err)});
// const obj={
//     name: 'Kannur',
//     latitude: 11.86752,
//     longitude: 75.35763,
// }
// getWeatherData(obj).catch((err)=>console.log(err));
const form = document.getElementById("input-form");
const mainHead = document.querySelector(".main-head");
const inputArea = form.querySelector(".city-input");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputArea.value.trim();
  console.log(value);
  inputArea.classList.add("searching");
  form.reset();
  if (value !== "")
    fetchLatiLongi(value)
      .then((newobj) =>
        getWeatherData(newobj)
          .then((json) => display(json))
          .catch((err) => errorDisplay(err)),
      )
      .catch((err) => errorDisplay(err));
});
inputArea.addEventListener("input", (e) => {
  console.log("triggered");
  errorDiv.classList.remove("show-error");
});
const container = document.querySelector(".show-results");
const payload = getSessionCache("weather");
if (payload) {
  display(payload);
}
function display(json) {
  setSessionCache("weather", json, 600000);
  console.log(json);
  const tempval = document.querySelector(".tempVal");
  const windval = document.querySelector(".wind-val");
  const codeval = document.querySelector(".code-val");
  inputArea.classList.remove("searching");
  tempval.innerHTML = `${json["temperature"]} \&deg;C`;
  windval.textContent = `${json["wind_speed"]} km/h`;
  codeval.textContent = `${json["weather_code"]}`;
  container.classList.add("visible");
  mainHead.textContent = `Result for ${json["name"]}:`;
  mainHead.classList.add("visible1");
}
const errorDiv = document.querySelector(".error");
function errorDisplay(err) {
  console.log(errorDiv);
  inputArea.classList.remove("searching");
  errorDiv.classList.add("show-error");
  mainHead.classList.remove("visible1");
  container.classList.remove("visible");
  console.log(err.message);
}
function setSessionCache(key, value, ttl = 60000) {
  const expiry = Date.now() + ttl;
  const payload = {
    data: value,
    expiresAt: expiry,
  };
  console.log(payload);
  sessionStorage.setItem(key, JSON.stringify(payload));
}
function getSessionCache(key) {
  const cached = sessionStorage.getItem(key);
  if (!cached) return null;
  try {
    const cachedVal = JSON.parse(cached);
    if (Date.now() > cachedVal.expiresAt) {
      console.log("expired");
      sessionStorage.removeItem(key);
      return null;
    }
    return cachedVal.data;
  } catch (err) {
    console.error(err.message);
  }
}
