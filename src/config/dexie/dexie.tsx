/* eslint-disable react-refresh/only-export-components */
import Dexie, { Table } from "dexie";
import { CHAT_DB } from "../environment";
import { IChatData } from "../../interfaces/home";

const db = new Dexie(CHAT_DB) as Dexie & {
  chat_data: Table<IChatData, string>;
};

// Schema declaration:
db.version(1).stores({
  chat_data:
    "id, sender, roomId, content, building_contents, timestamp",
});

export type { IChatData };
export default db;
