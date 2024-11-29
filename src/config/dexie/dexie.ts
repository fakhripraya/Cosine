/* eslint-disable react-refresh/only-export-components */
import Dexie, { Table } from "dexie";
import { DB_NAME } from "../environment";
import { IChatData } from "../../interfaces/chat";
import { IUserSavedLocation } from "../../interfaces/building";

const db = new Dexie(DB_NAME) as Dexie & {
  chat_data: Table<IChatData, string>;
  user_saved_location_data: Table<
    IUserSavedLocation,
    string
  >;
};

// Schema declaration:
db.version(9).stores({
  chat_data:
    "id, sender.id, content.sendSpecificToId, buildingContents.id, [sender.id+content.sendSpecificToId], roomId, timestamp",
  user_saved_location_data:
    "id, userId, savedLocationId, savedLocation, timestamp",
});

export type { IChatData };
export default db;
