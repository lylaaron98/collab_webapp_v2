"use client"; // Mark this component as a Client Component

import { getChatById } from "@/lib/actions/chat";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChatDetails from "./ChatDetails";
import { useUser } from "@clerk/nextjs";

const Chat = () => {
  const { id } = useParams(); // Get the chat ID from the URL
  const [chat, setChat] = useState(null);

  const { user: loggedUser } = useUser();

  useEffect(() => {
    const fetchChat = async () => {
      const chatData = await getChatById(id);

      console.log("chatData", chatData);
      // fetch my profile

      let myProfile = null;
      let otherProfile = null;

      chatData?.users?.map((user) => {
        if (loggedUser?.id === user?.clerkId) {
          myProfile = user;
        } else {
          otherProfile = user;
        }
      });

      setChat({ id, messages: chatData?.messages, myProfile, otherProfile });
    };

    fetchChat();
  }, [id, loggedUser?.id]); // Fetch chat data when the ID changes

  if (!chat) {
    return <div>Loading...</div>; // Show a loading state while fetching
  }

  return <ChatDetails chat={chat} setChat={setChat} />;
};

export default Chat;
