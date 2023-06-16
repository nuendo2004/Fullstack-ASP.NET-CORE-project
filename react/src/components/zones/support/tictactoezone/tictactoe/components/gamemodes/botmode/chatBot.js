import sendMessage from "components/chat/chatbox/sendMessage";

const endpoint = "$$$/zones/tictactoe/hacked";

const runBot = (chatData, currentZone, gamesPlayed) => {
  const { senderData, recipientData } = chatData.chatParticipants;
  const { chatName } = chatData;
  const newChatData = {
    participants: {
      senderData: { ...recipientData },
      recipientData: { ...senderData },
    },
    chatName: chatName,
  };

  const botMessages = {
    first: "Don't you know I'm unbeatable?",
    second: "Told you",
    third: "Okay here's a hint",
    fourth: `${endpoint},TicTacToe tips`,
  };

  if (gamesPlayed) {
    switch (gamesPlayed) {
      case 1:
        sendMessage(botMessages.first, newChatData, currentZone);
        break;
      case 2:
        sendMessage(botMessages.second, newChatData, currentZone);
        break;
      case 3:
        sendMessage(botMessages.third, newChatData, currentZone);
        setTimeout(() => {
          sendMessage(botMessages.fourth, newChatData, currentZone);
        }, 2000);
        break;
      default:
        break;
    }
  }
};

export default runBot;
