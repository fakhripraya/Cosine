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

export const createChatData = (
  message: OneToOneChat,
  buildingContents?: IBuildingDetails[]
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
