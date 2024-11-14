export const OLYMPUS_SERVICE = import.meta.env
  .VITE_OLYMPUS_SERVICE as string;
export const HERMES_SERVICE = import.meta.env
  .VITE_HERMES_SERVICE as string;
export const ARES_SERVICE = import.meta.env
  .VITE_ARES_SERVICE as string;

export const DB_NAME = import.meta.env
  .VITE_DB_NAME as string;

export const CUSTOMER_SERVICE = import.meta.env
  .VITE_CUSTOMER_SERVICE as string;

export const APP_EMAIL =
  (import.meta.env.VITE_APP_EMAIL as string) ??
  "letmeask@pintrail.app";
