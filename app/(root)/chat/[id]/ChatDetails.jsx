"use client";

import { deleteChatById, updateChatById } from "@/lib/actions/chat";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../../../socket"; // Ensure this path is correct
import { useRouter } from "next/navigation";

const ChatDetails = ({ chat, setChat }) => {
  const { id: chatId, myProfile, otherProfile, messages } = chat;

  const inputValueRef = useRef("");
  const inputRef = useRef();
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("Socket disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (isConnected && chatId) {
      console.log(`Joining room: ${chatId}`);
      socket.emit("joinRoom", chatId);
    }
  }, [chatId, isConnected]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, message],
      }));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [setChat]);

  const sendMessageFunc = async () => {
    if (inputValueRef.current !== "") {
      const newMessage = {
        roomId: chatId,
        sender: myProfile._id,
        content: inputValueRef.current,
      };

      await updateChatById(chatId, { $push: { messages: newMessage } });

      socket.emit("sendMessage", newMessage);

      inputRef.current.value = "";
      inputValueRef.current = "";
    }
  };

  return (
    <div className="flex flex-col h-[74vh] w-[60vw] mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <p className="text-lg font-semibold">Let&apos;s Chat</p>
        <button className="text-white hover:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={async () => {
              const { success } = await deleteChatById(chatId);
              if (success) {
                router.push("/users");
              }
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        {messages?.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No messages yet.
          </p>
        ) : (
          messages?.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.sender === myProfile?._id ? "justify-end" : "justify-start"}`}
            >
              {message.sender !== myProfile?._id && (
                <Image
                  src={otherProfile?.photo}
                  width={60}
                  height={40}
                  className="rounded-full mr-2"
                  alt="avatar"
                />
              )}

              <div
                className={`inline-block p-3 rounded-lg shadow-md ${
                  message.sender === myProfile?._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 dark:bg-gray-600 dark:text-white"
                }`}
              >
                <p className="whitespace-pre-wrap text-[20px]">
                  {message.content}
                </p>
              </div>

              {message.sender === myProfile?._id && (
                <Image
                  src={myProfile?.photo}
                  width={60}
                  height={40}
                  className="rounded-full ml-2"
                  alt="avatar"
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Chat Footer */}
      <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-600">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          onChange={(e) => (inputValueRef.current = e.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessageFunc();
          }}
        />
        <button
          onClick={sendMessageFunc}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDetails;
