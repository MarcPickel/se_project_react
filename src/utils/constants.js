export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets", import.meta.url),
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("", import.meta.url),
  },
  {
    day: true,
    condition: "foggy",
    url: new URL("", import.meta.url),
  },
  {
    day: true,
    condition: "rainy",
    url: new URL("", import.meta.url),
  },
  {
    day: true,
    condition: "snowy",
    url: new URL("", import.meta.url),
  },
  {
    day: true,
    condition: "stormy",
    url: new URL("", import.meta.url),
  },
  {
    day: false,
    condition: "clear",
    url: new URL("", import.meta.url),
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("", import.meta.url),
  },
  {
    day: false,
    condition: "foggy",
    url: new URL("", import.meta.url),
  },
  {
    day: false,
    condition: "rainy",
    url: new URL("", import.meta.url),
  },
  {
    day: false,
    condition: "snowy",
    url: new URL("", import.meta.url),
  },
  {
    day: false,
    condition: "stormy",
    url: new URL("", import.meta.url),
  },
];

const coordinates = {
  latitude: 43.4889637,
  longitude: -96.721992,
};

const APIkey = "f3076ab8f54542e1ef847f148ec82b59";

export { coordinates, APIkey };
