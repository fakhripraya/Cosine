import React, { useCallback } from "react";
import ShowChatWrapper from "./ShowChatWrapper";
import { IChatData } from "../../../interfaces/chat";

interface ShowChatWrappersProps {
  chats: IChatData[];
  uniqueKey: string;
}

const ShowChatWrappers: React.FC<ShowChatWrappersProps> = ({
  chats,
  uniqueKey,
}) => {
  const render = useCallback(
    () =>
      chats.map((obj, index) => (
        <ShowChatWrapper
          key={`${uniqueKey}-chat-wrapper-${index}`}
          chat={obj}
        />
      )),
    [chats, uniqueKey]
  );

  // return the memoized render function
  return render();
};

export default ShowChatWrappers;
