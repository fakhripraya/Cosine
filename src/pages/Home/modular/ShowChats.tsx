import React, { useCallback } from "react";
import ShowChat from "./ShowChat";
import { OneToOneChat } from "../../../config/dexie/dexie";

interface ShowChatsProps {
  contents: OneToOneChat[];
  uniqueKey: string;
}

const ShowChats: React.FC<ShowChatsProps> = ({
  contents,
  uniqueKey,
}) => {
  const render = useCallback(
    () =>
      Object.entries(contents).map((obj, index) => (
        <ShowChat
          key={`${uniqueKey}-chat-${index}`}
          value={obj}
        />
      )),
    [contents, uniqueKey]
  );

  // return the memoized render function
  return render();
};

export default ShowChats;
