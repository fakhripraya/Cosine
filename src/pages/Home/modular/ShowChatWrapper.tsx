/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useMemo } from "react";
import Avatar from "react-avatar";
import ShowChat from "./ShowChat";
import { IChatData } from "../../../interfaces/home";
import { ShowGrabableStoreCardCarousel } from "./ShowCarousels";

interface ShowChatWrapperProps {
  chat: [string, IChatData];
}

const ShowChatWrapper: React.FC<ShowChatWrapperProps> = ({
  chat,
}) =>
  useMemo(
    () => (
      <Fragment>
        <div className="home-page-chattext-container">
          <div className="home-page-chattext-avatar">
            <Avatar
              style={{ cursor: "pointer" }}
              round={true}
              size={"50"}
              src={chat[1].sender.profilePictureURI}
              title={chat[1].sender.fullName}
              name={chat[1].sender.fullName}
            />
          </div>
          <div className="home-page-chattext-wrapper">
            <div>
              <h4 className="home-page-chattext-username">
                {chat[1].sender.fullName}
              </h4>
              {chat[1].content.createdAt}
            </div>
            <ShowChat
              content={chat[1].content}
              uniqueKey={chat[0]}
            />
            {chat[1].building_contents && (
              <ShowGrabableStoreCardCarousel
                uniqueKey={chat[0]}
                values={chat[1].building_contents}
              />
            )}
          </div>
        </div>
      </Fragment>
    ),
    [chat]
  );

export default ShowChatWrapper;
