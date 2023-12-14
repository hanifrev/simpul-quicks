import React, { useState } from "react";
import MessageDetail from "./MessageDetail";
import MessageList from "./MessageList";

const ModalInbox = ({ isModalOpen }) => {
  const [detailMessage, setDetailMessage] = useState(false);
  const [idMessage, setIdMessage] = useState("");

  console.log(detailMessage);

  return (
    isModalOpen && (
      <div id="modalInbox" className={`bg-white py-6 px-8`}>
        <div className="flex flex-row">
          <input
            type="search"
            className="bg-transparent mx-auto p-[10px] text-black flex"
            placeholder="Search"
          />
        </div>

        <MessageList openMessage={setDetailMessage} messageId={setIdMessage} />
        {detailMessage && (
          <MessageDetail onClose={setDetailMessage} id={idMessage} />
        )}
      </div>
    )
  );
};

export default ModalInbox;
