export const CUSTOMER_SERVICE = import.meta.env
  .VITE_CUSTOMER_SERVICE as string;
export const APP_STATE = import.meta.env
  .VITE_STATE as string;

export const DB_NAME = import.meta.env
  .VITE_DB_NAME as string;

export const OLYMPUS_SERVICE = import.meta.env
  .VITE_OLYMPUS_SERVICE as string;
export const HERMES_SERVICE = import.meta.env
  .VITE_HERMES_SERVICE as string;
export const ARES_SERVICE = import.meta.env
  .VITE_ARES_SERVICE as string;
export const POSTGIRL_SERVICE = import.meta.env
  .VITE_POSTGIRL_SERVICE as string;

export const OLYMPUS_SERVICE_API_KEY = import.meta.env
  .VITE_OLYMPUS_SERVICE_API_KEY as string;
export const HERMES_SERVICE_API_KEY = import.meta.env
  .VITE_HERMES_SERVICE_API_KEY as string;
export const ARES_SERVICE_API_KEY = import.meta.env
  .VITE_ARES_SERVICE_API_KEY as string;
export const POSTGIRL_SERVICE_API_KEY = import.meta.env
  .VITE_POSTGIRL_SERVICE_API_KEY as string;

export const APP_EMAIL =
  (import.meta.env.VITE_APP_EMAIL as string) ??
  "letmeask@pintrail.app";
