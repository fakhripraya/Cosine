import { BuildingDetails } from "../building";

export interface IChatData {
  id: string;
  sender: {
    id: string;
    fullName: string;
    profilePictureURI?: string;
  };
  content: OneToOneChat;
  buildingContents?: BuildingDetails[];
  timestamp: string;
}

export interface OneToOneChat {
  id: string;
  chatContent: string;
  senderId: string;
  senderFullName: string;
  sendSpecificToId?: string;
  senderProfilePictureUri?: string;
  createdAt: string;
}
