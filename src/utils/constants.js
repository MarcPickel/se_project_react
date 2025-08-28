export const weatherOptions = [
  {
    day: true,
    condition: "sunny",
    url: new URL("../assets/day/clear", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/fog", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../assets/day/storm", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/day/clear", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/day/fog", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/day/rain", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/day/snow", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../assets/day/storm", import.meta.url).href,
  },
];

const coordinates = {
  latitude: 43.4889637,
  longitude: -96.721992,
};

const APIkey = "f3076ab8f54542e1ef847f148ec82b59";

export { coordinates, APIkey };
