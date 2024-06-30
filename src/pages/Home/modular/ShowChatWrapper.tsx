import React, { useMemo } from "react";
import Avatar from "react-avatar";
import ShowChats from "./ShowChats";
import { IChatData } from "../Interfaces/IChatData";

interface ShowChatWrapperProps {
  chat: [string, IChatData];
}

const ShowChatWrapper: React.FC<ShowChatWrapperProps> = ({
  chat,
}) =>
  useMemo(
    () => (
      <div className="creative-store-chattext-container">
        <div className="creative-store-chattext-avatar">
          <Avatar
            style={{ cursor: "pointer" }}
            round={true}
            size={"50"}
            src={chat[1].sender.profilePictureURI}
            title={chat[1].sender.fullName}
            name={chat[1].sender.fullName}
          />
        </div>
        <div className="creative-store-chattext-wrapper">
          <div>
            <h4 className="creative-store-chattext-username">
              {chat[1].sender.fullName}
            </h4>
            {
              Object.entries(chat[1].contents)[
                Object.entries(chat[1].contents).length - 1
              ][1].createdAt
            }
          </div>
          <ShowChats
            contents={chat[1].contents}
            uniqueKey={chat[0]}
          />
        </div>
      </div>
    ),
    [chat]
  );

export default ShowChatWrapper;
