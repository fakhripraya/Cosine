import { IBuildingDetails } from "../building";
import { IPathFinder } from "../geo";

export interface IChatData {
  id: string;
  sender: {
    id: string;
    fullName: string;
    profilePictureURI?: string;
  };
  content: OneToOneChat;
  buildingContents?: IBuildingDetails[];
  pathFinder?: IPathFinder;
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

export interface IChatLoading {
  isLoading: boolean;
  loadingChatData: IChatData;
}
