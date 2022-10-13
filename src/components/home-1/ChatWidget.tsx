import React, { Component } from "react";
import { ChatAwesome } from "react-chat-awesome";

export default class ChatWidget extends Component {
  sender: { id: number };
  receiver: { id: number; imageUrl: string };
  constructor(props) {
    super(props);

    this.state = {
      history: [],
    };

    this.sender = { id: 1 };
    this.receiver = { id: 2, imageUrl: "path/to/source" };

    this.onSendMessageClick = this.onSendMessageClick.bind(this);
  }

  onSendMessageClick(msgText) {
    this.setState({
      history: [
        // ...this.state.history,
        {
          id: +new Date(),
          msg: {
            type: "text",
            text: msgText,
          },
          userID: this.sender.id,
        },
      ],
    });
  }

  render() {
    return (
      <div>
        <ChatAwesome
          // history={this.state.history}
          sender={this.sender}
          receiver={this.receiver}
          onSendMessageClick={this.onSendMessageClick}
        />
      </div>
    );
  }
}
