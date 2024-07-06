import React, { Fragment, useMemo } from "react";
import Avatar from "react-avatar";
import ShowChat from "./ShowChat";
import { IChatData } from "../../../interfaces/home";

interface ShowChatWrapperProps {
  chat: [string, IChatData];
}

const ShowChatWrapper: React.FC<ShowChatWrapperProps> = ({
  chat,
}) =>
  useMemo(
    () => (
      <Fragment>
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
              {chat[1].content.createdAt}
            </div>
            <ShowChat
              content={chat[1].content}
              uniqueKey={chat[0]}
            />
          </div>
        </div>
        {chat[1].building_contents && (
          <div className="creative-store-chat-cards-container">
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
                {chat[1].content.createdAt}
              </div>
              <ShowChat
                content={chat[1].content}
                uniqueKey={chat[0]}
              />
            </div>
          </div>
        )}
      </Fragment>
    ),
    [chat]
  );

export default ShowChatWrapper;
