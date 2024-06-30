/* eslint-disable react-refresh/only-export-components */
import Dexie, { Table } from "dexie";

const CHAT_DB: string =
  process.env.REACT_APP_CHAT_DB ?? "DB";

interface OneToOneChat {
  id?: number;
  channelId: string;
  roomId: string;
  chatContent: string;
  imageURI?: string;
  isChat: boolean;
  isImage: boolean;
  senderId: string;
  senderFullName: string;
  senderProfilePictureUri?: string;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

const db = new Dexie(CHAT_DB) as Dexie & {
  one_to_one_chat: Table<OneToOneChat, "id">;
};

// Schema declaration:
db.version(1).stores({
  one_to_one_chat:
    "++id, channelId, roomId, chatContent, imageURI, isChat, isImage, senderId, senderFullName, senderProfilePictureUri, createdAt, updatedAt, deletedAt",
});

export type { OneToOneChat };
export default db;
