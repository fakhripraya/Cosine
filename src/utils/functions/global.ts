import { URLSearchParams } from "url";
import { CUSTOMER_SERVICE } from "../../config/environment";
import { isIResponseObject } from "../../interfaces/axios";
import { IMAGE_MIME_TYPE } from "../../variables/global";

// Send static Whatsapp messages to Customer Service
export function sendWACS() {
  return window.open(
    `https://wa.me/${CUSTOMER_SERVICE}?text=Hi%20kak%20mau%20nanya%20dong%20!%20!%20!`,
    "_blank"
  );
}

export function scrollCarousel(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ele: HTMLDivElement | null
): void {
  if (!ele) return;

  const pos = {
    left: ele.scrollLeft ?? 0,
    x: e.clientX ?? 0,
    y: e.clientY ?? 0,
  };

  function mouseMoveHandler(e: MouseEvent) {
    if (!ele) return;
    const dx = e.clientX - pos.x;

    ele.scrollLeft = pos.left - dx;
  }

  function mouseUpHandler() {
    if (!ele) return;
    window.removeEventListener(
      "mousemove",
      mouseMoveHandler
    );
    window.removeEventListener("mouseup", mouseUpHandler);

    ele.style.cursor = "grab";
    ele.style.removeProperty("user-select");
  }

  // Change the cursor and prevent user from selecting the text
  ele.style.cursor = "grabbing";
  ele.style.userSelect = "none";

  window.addEventListener("mousemove", mouseMoveHandler);
  window.addEventListener("mouseup", mouseUpHandler);
}

export function smoothScrollTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

export const delayInMilliSecond = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export const clearAllUrlParameters = () => {
  const currentUrl = new URL(window.location.href);
  currentUrl.search = "";
  window.history.replaceState({}, "", currentUrl.href);
};

export const getURLParams = (
  url: URLSearchParams,
  key: string
) => url.get(key);

export const setURLParams = (
  url: URLSearchParams,
  key: string,
  val: string
) => {
  url.set(key, val);
  const newUrl = url.toString();
  window.history.pushState({}, "", newUrl);
};

export const removeTrailingNewlines = (str: string) => {
  if (!str) return "";
  return str.replace(/\n+$/, "");
};

export const removeLeadingZeros = (str: string) => {
  // Use regular expression to remove leading zeros
  return str.replace(/^0+/, "");
};

export const formattedNumber = (number: number) => {
  if (isNaN(number)) number = 0;
  return new Intl.NumberFormat().format(number);
};

export const formattedCurrencyIDR = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const unformattedNumber = (
  formattedString: string
) => {
  // Remove any non-numeric characters and parse the string to a number
  const unformattedString = formattedString.replace(
    /[^\d.-]/g,
    ""
  );
  return parseFloat(unformattedString);
};

export const acceptNumericOnly = (input: string) => {
  // Remove any non-numeric characters
  input = input.replace(/[^0-9]/g, "");
  return input;
};

export const formatDateID = (date: string) => {
  const inputDate = new Date(date);

  // Indonesian days of the week
  const indonesianDaysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const dayName =
    indonesianDaysOfWeek[inputDate.getUTCDay()];
  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1;
  const year = inputDate.getUTCFullYear();

  const formattedDate = `${dayName}, ${day
    .toString()
    .padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;

  return formattedDate;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleException = (error: any) => {
  console.log(error);
  if (isIResponseObject(error))
    return alert(JSON.stringify(error.errorContent));
  alert(JSON.stringify(error));
};

export const isImageType = (type: string) => {
  return IMAGE_MIME_TYPE.includes(type);
};

// Haversine formula to calculate distance between two lat/lon points in km
export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // Radius of Earth in kilometers
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}