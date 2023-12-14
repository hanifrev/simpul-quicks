import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import back from "../assets/back.svg";
import close from "../assets/close.svg";

const MessageDetail = ({ id, onClose }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://64292bae5a40b82da4cdd907.mockapi.io/message/${id}`
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div id="modalInboxDetail" className=" bg-white py-[19.5px] px-8">
      <div className="flex flex-row ">
        <div className="cursor-pointer flex" onClick={() => onClose(false)}>
          <Image src={back} alt="img" />
        </div>
        <div className="flex flex-row w-full justify-between pl-[14.5px]">
          <div className="flex flex-col ">
            <div className="text-[#2F80ED] font-bold pb-[9.36px]">
              {data && data.title}
            </div>
            <div className="text-xs font-light text-black">
              {data.id} participant
            </div>
          </div>
          <div className="cursor-pointer flex" onClick={() => onClose(false)}>
            <Image src={close} alt="img" />
          </div>
        </div>
      </div>
      <div className="chatList">chat</div>
      <div className="fieldChat flex flex-row ">
        <form className="flex gap-[17px]">
          <input
            className="bg-transparent text-black"
            placeholder="Type a new message"
          />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default MessageDetail;
