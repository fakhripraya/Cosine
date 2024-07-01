import { URLSearchParams } from "url";

// Whatsapp sender
export function sendWACS() {
  // Send static Whatsapp messages to Customer Service
  // TODO: Insert the Whatsapp number to ENV
  return window.open(
    `https://wa.me/${6281280111698}?text=Hi%20kak%20mau%20nanya%20dong%20!%20!%20!`,
    "_blank"
  );
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
