export interface IChatData {
  sender: {
    id: string;
    fullName: string;
    profilePictureURI?: string;
  };
  content: OneToOneChat;
  building_contents?: string;
}

export interface OneToOneChat {
  id: string;
  chatContent: string;
  senderId: string;
  senderFullName: string;
  senderProfilePictureUri?: string;
  createdAt: string;
}
