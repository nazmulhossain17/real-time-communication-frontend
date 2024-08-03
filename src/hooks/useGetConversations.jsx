import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConversationsFailure,
  fetchConversationsStart,
  fetchConversationsSuccess,
} from "../redux/conversation/conversationSlice";
import { toast } from "react-toastify";

const useGetConversations = () => {
  const dispatch = useDispatch();
  const { loading, conversations } = useSelector((state) => state.conversation);

  useEffect(() => {
    const getConversations = async () => {
      dispatch(fetchConversationsStart());
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(fetchConversationsSuccess(data));
      } catch (error) {
        toast.error(error.message);
        dispatch(fetchConversationsFailure(error.message));
      }
    };

    getConversations();
  }, [dispatch]);

  return { loading, conversations };
};

export default useGetConversations;
