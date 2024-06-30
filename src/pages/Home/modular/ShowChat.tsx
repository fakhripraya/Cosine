import React, { useMemo } from "react";

interface ShowChatProps {
  value: [string, { chatContent: string }];
}

const ShowChat: React.FC<ShowChatProps> = ({ value }) => {
  const chatContent = useMemo(
    () => value[1].chatContent,
    [value]
  );

  return (
    <p style={{ whiteSpace: "pre-line" }}>{chatContent}</p>
  );
};

export default ShowChat;
