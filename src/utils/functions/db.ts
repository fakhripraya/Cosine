import {
  IBuildingDetails,
  IUserSavedLocation,
} from "../../interfaces/building";
import {
  IChatData,
  OneToOneChat,
} from "../../interfaces/chat";
import { v4 as uuidv4 } from "uuid";
import { IUserData } from "../../interfaces/credential";
import moment from "moment";
import { INITIAL_PINTRAIL_MESSAGE } from "../../variables/constants/home";
import {
  AI_ID,
  AI_NAME,
  AI_PROFILE_PIC_URL,
} from "../../variables/constants/ai";
import { IPathFinder } from "../../interfaces/geo";

export const addPintrailNoteChatData = (
  user: IUserData | null,
  chatDatas: IChatData[]
) => {
  const timeNow = moment(new Date())
    .format("dddd, MMMM Do YYYY, h:mm:ss a")
    .toString();
  const initMessage: OneToOneChat = {
    id: uuidv4(),
    chatContent: INITIAL_PINTRAIL_MESSAGE,
    senderId: AI_ID,
    senderFullName: AI_NAME,
    sendSpecificToId: user?.userId,
    senderProfilePictureUri: AI_PROFILE_PIC_URL,
    createdAt: timeNow,
  };

  const initData = createChatData(initMessage);
  chatDatas.push(initData);

  return chatDatas;
};

export const createChatData = (
  message: OneToOneChat,
  buildingContents?: IBuildingDetails[],
  pathFinder?: IPathFinder
) => {
  const chatData: IChatData = {
    id: uuidv4(),
    sender: {
      id: message.senderId,
      fullName: message.senderFullName,
      profilePictureURI: message.senderProfilePictureUri,
    },
    content: message,
    buildingContents: buildingContents,
    pathFinder: pathFinder,
    timestamp: new Date().toISOString(),
  };
  return chatData;
};

export const createSavedLocationData = (
  savedLocation: IBuildingDetails,
  user: IUserData
) => {
  const locationData: IUserSavedLocation = {
    id: uuidv4(),
    userId: user.userId,
    savedLocationId: savedLocation.building_title,
    savedLocation: savedLocation,
    timestamp: new Date().toISOString(),
  };
  return locationData;
};
