import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Image from "next/image";
import messageIcon from "../assets/messageIcon.svg";
import moment from "moment";

const MessageList = ({ openMessage, messageId, classList }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(
        "https://64292bae5a40b82da4cdd907.mockapi.io/message"
      );
      setData(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // console.log(data);

  const handleMessageDetail = (id) => {
    openMessage(true);
    messageId(id);
  };

  return (
    <>
      {loading ? (
        <>
          <ReactLoading
            className="mx-auto pt-[265px]"
            type="spin"
            color="#C4C4C4"
            height={64}
            width={64}
          />
          <span className="text-[#4f4f4f] flex justify-center pt-[5.5rem] font-medium">
            Loading Chats ...
          </span>
        </>
      ) : (
        <div id="messageList" className={`${classList}text-black `}>
          {data &&
            data.map((x, index) => {
              return (
                index < 4 && (
                  <div className="flex flex-row border-b-2">
                    <div className="pr-[17px]">
                      <Image src={messageIcon} alt="img" />
                    </div>
                    <div className="flex flex-col pb-[22px]">
                      <div className="flex flex-row gap-4">
                        <span
                          className="text-[#2F80ED] font-bold cursor-pointer"
                          onClick={() => handleMessageDetail(x.id)}
                        >
                          {x.title.substring(0, 35)}
                        </span>
                        <span className="text-[#4f4f4f] text-sm mt-[2px]">
                          {moment(x.createdAt).format("DD/MM/YYYY hh:mm")}
                        </span>
                      </div>
                      <div className="text-[#4f4f4f] font-bold  text-sm">
                        {x.name}:
                      </div>
                      <div className="text-[#4f4f4f] text-sm">
                        {x.messages.substring(0, 25)}...
                      </div>
                    </div>
                  </div>
                )
              );
            })}
        </div>
      )}
    </>
  );
};

export default MessageList;
