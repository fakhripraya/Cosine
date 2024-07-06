import { OneToOneChat } from "../../config/dexie/dexie";

export interface IChatData {
  sender: {
    id: string;
    fullName: string;
    profilePictureURI?: string;
  };
  contents: OneToOneChat[];
  image_contents: string | undefined;
}
