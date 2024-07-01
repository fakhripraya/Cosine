import { OneToOneChat } from "../../config/dexie/dexie";

export interface IChatData {
  sender: {
    profilePictureURI: string;
    fullName: string;
  };
  contents: OneToOneChat[];
}
