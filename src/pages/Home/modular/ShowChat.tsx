import React, { useMemo } from "react";
import { OneToOneChat } from "../../../interfaces/home";

interface ShowChatProps {
  content: OneToOneChat;
  uniqueKey: string;
}

const ShowChat: React.FC<ShowChatProps> = ({
  content,
  uniqueKey,
}) =>
  useMemo(
    () => (
      <p
        key={`${uniqueKey}-chat`}
        style={{ whiteSpace: "pre-line" }}>
        {content.chatContent}
      </p>
    ),
    [content.chatContent, uniqueKey]
  );

export default ShowChat;
