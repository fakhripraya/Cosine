import { Socket } from "socket.io-client";
import moment from "moment";
import db from "../../../config/dexie/dexie";

// Define types for login, db, and other used variables
interface UserLogin {
  userId: string;
  fullName: string;
  profilePictureUri: string;
}

interface ChatContent {
  chatContent: string;
  imageURI: string;
  isChat: boolean;
  isImage: boolean;
  senderId: string;
  senderFullName: string;
  senderProfilePictureUri: string;
}

interface ConnectionStatus {
  chatSocketStatus: string;
  chatSocketFirstConnected: boolean;
}

interface NewConnectionRenderParams {
  user?: UserLogin;
}

interface ReceiveChatParams {
  content: ChatContent;
  roomId: string;
  channelId: string;
}

declare const setUserJoin: (user: UserLogin) => void;
declare const CONNECTED: string;

class ChatSignaler {
  private peerRef: Socket;
  private userId: string | null;
  private userLogin: UserLogin | null;
  private connectionStatus: ConnectionStatus | null;
  private _chatPagination: number;

  constructor(peerRef: Socket) {
    this.peerRef = peerRef;
    this.userId = null;
    this.userLogin = null;
    this.connectionStatus = null;
    this._chatPagination = 1;

    // SOCKET EVENTS LISTENER
    // Server informs the client of user joining the room
    this.peerRef.on("connection-success", (callback) => {
      callback({
        userId: this.userId,
        user: this.userLogin,
      });
    });

    this.peerRef.on(
      "new-connection-render",
      ({ user }: NewConnectionRenderParams) => {
        if (user) setUserJoin(user);

        const connectionStatus = {
          chatSocketStatus: CONNECTED,
          chatSocketFirstConnected: true,
        };
        this.setConnectionStatus(connectionStatus);
      }
    );

    this.peerRef.on(
      "receive-chat",
      ({
        content,
        roomId,
        channelId,
      }: ReceiveChatParams) => {
        this.saveChatToDatabase({
          content,
          roomId,
          channelId,
        });
      }
    );

    // CLEANUP EVENTS
    // This will trigger when the local producer(user) leaves the room
    this.peerRef.on("disconnect", () => {});
  }

  async setConnectionStatus({
    chatSocketStatus,
    chatSocketFirstConnected,
  }: ConnectionStatus) {
    this.connectionStatus = {
      chatSocketStatus,
      chatSocketFirstConnected,
    };
  }

  get chatPagination(): number {
    return this._chatPagination;
  }

  set chatPagination(chatPagination: number) {
    if (typeof chatPagination === "undefined")
      throw new Error(
        "Unable to set 'chatPagination' property with undefined value"
      );
    this._chatPagination = chatPagination;
  }

  async getChatFromDatabase(chatPagination: number) {
    const chats = await db.one_to_one_chat
      .orderBy(":id")
      .offset(25 * chatPagination)
      .limit(25)
      .toArray();

    return chats;
  }

  saveChatToDatabase({
    content,
    roomId,
    channelId,
  }: ReceiveChatParams) {
    db.transaction("rw", db.one_to_one_chat, async () => {
      const id = await db.one_to_one_chat.add({
        channelId,
        roomId,
        chatContent: content.chatContent,
        imageURI: content.imageURI,
        isChat: content.isChat,
        isImage: content.isImage,
        senderId: content.senderId,
        senderFullName: content.senderFullName,
        senderProfilePictureUri:
          content.senderProfilePictureUri,
        createdAt: moment(new Date())
          .format("dddd, MMMM Do YYYY, h:mm:ss a")
          .toString(),
        updatedAt: null,
        deletedAt: null,
      });

      const chat = await db.one_to_one_chat.get({
        id,
      });

      console.log(chat);
      //handleNewChatRender(chat);
    }).catch((e) => {
      console.error(e.stack || e);
    });
  }

  //   sendChat(
  //     {
  //       chat,
  //       imageURI,
  //       isChat,
  //       isImage,
  //     }: Partial<ChatContent>,
  //     joinedChatRoom: JoinedChatRoom
  //   ) {
  //     const content: ChatContent = {
  //       chatContent: chat!,
  //       imageURI: imageURI!,
  //       isChat: isChat!,
  //       isImage: isImage!,
  //       senderId: user.userId,
  //       senderFullName: user.fullName,
  //       senderProfilePictureUri: this.userLogin.profilePictureUri,
  //     };

  //     const chatData: ReceiveChatParams = {
  //       content: content,
  //       roomId: joinedChatRoom.roomId,
  //       channelId: joinedChatRoom.channelId,
  //     };

  //     this.saveChatToDatabase(chatData);
  //     this.peerRef.emit(
  //       "chat-send",
  //       this.userId,
  //       chatData,
  //       () => {
  //         // Set sending chat delay
  //         // TODO: add chat delay function
  //       }
  //     );
  //   }
}

export default ChatSignaler;
