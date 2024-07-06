/* eslint-disable react-refresh/only-export-components */
import Dexie, { Table } from "dexie";
import { CHAT_DB } from "../environment";

interface OneToOneChat {
  id: string;
  chatContent: string;
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
