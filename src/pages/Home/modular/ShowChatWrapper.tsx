/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useMemo } from "react";
import Avatar from "react-avatar";
import ShowChat from "./ShowChat";
import { IChatData } from "../../../interfaces/home";
import { ShowGrabableStoreCardCarousel } from "./ShowCarousels";

interface ShowChatWrapperProps {
  chat: IChatData;
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
              src={chat.sender.profilePictureURI}
              title={chat.sender.fullName}
              name={chat.sender.fullName}
            />
          </div>
          <div className="home-page-chattext-wrapper">
            <div>
              <p className="home-page-chattext-username font-bold">
                {chat.sender.fullName}
              </p>
              {chat.content.createdAt}
            </div>
            <ShowChat
              content={chat.content}
              uniqueKey={chat.id}
            />
            {chat.building_contents && (
              <ShowGrabableStoreCardCarousel
                uniqueKey={chat.id}
                values={chat.building_contents}
              />
            )}
          </div>
        </div>
      </Fragment>
    ),
    [chat]
  );

export default ShowChatWrapper;
