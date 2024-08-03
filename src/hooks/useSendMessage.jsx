import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessageFailure,
  sendMessageStart,
  sendMessageSuccess,
  setMessages,
} from "../redux/messageSlice/messageSlice";
import { toast } from "react-toastify";

const useSendMessage = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  const { selectedConversation } = useSelector((state) => state.conversation);
  const [localLoading, setLocalLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!selectedConversation) {
      toast.error("No conversation selected.");
      return;
    }

    setLocalLoading(true);
    dispatch(sendMessageStart());
    try {
      const res = await fetch(
        `http://localhost:3000/message/send/${selectedConversation.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      dispatch(sendMessageSuccess(data));
      dispatch(setMessages([...messages, data]));
    } catch (error) {
      toast.error(error.message);
      dispatch(sendMessageFailure(error.message));
    } finally {
      setLocalLoading(false);
    }
  };

  return { sendMessage, loading: localLoading };
};

export default useSendMessage;
