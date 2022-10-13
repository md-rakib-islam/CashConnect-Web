import useUserInf from "@customHook/useUserInf";
import { Chat } from "chat";
import React, { useEffect } from "react";
import ChatWidget from "./ChatWidget";

const Section14: React.FC = () => {
  const { authTOKEN } = useUserInf();

  console.log("authTOKEN", authTOKEN.headers.Authorization.slice(7));

  // console.log("token", token);

  useEffect(() => {
    const token = authTOKEN.headers.Authorization.slice(7);

    var ws = new WebSocket(`ws://192.168.0.151:8001/ws/chat/?token=${token}`);

    ws.onopen = function () {
      console.log("WebSocket connection is open....");
      ws.send(
        JSON.stringify({
          message: "Hi , Hello baror Islam ,, vai biya korben ni!!!",
        })
      );
    };
    ws.onmessage = function (event) {
      console.log("Message received from server....", event);
    };
    ws.onerror = function (event) {
      console.log("WebSocket Error occurred....", event);
    };
    ws.onclose = function (event) {
      console.log("WebSocket Connectin Closed....", event);
    };
  }, []);

  /// text

  return (
    <div>
      {/* <Chat /> */}
      {/* <Launcher
        agentProfile={{
          teamName: "react-chat-window",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        // onMessageWasSent={this._onMessageWasSent.bind(this)}
        // messageList={this.state.messageList}
        showEmoji
      /> */}
    </div>
  );
};

export default Section14;
