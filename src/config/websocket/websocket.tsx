import io, { Socket } from "socket.io-client";

export const connectWebsocket = (
  endpoint: string
): Socket => {
  return io(endpoint, {
    withCredentials: true,
    extraHeaders: {
      "user-agent": "Mozilla",
    },
  });
};
