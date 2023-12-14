import React, { useState } from "react";
import SearchBar from "./SearchBar";
import MenuBtn from "./MenuBtn";
import ModalInbox from "./ModalInbox";
import ModalTask from "./ModalTask";

const Main = () => {
  const [inboxOpen, setInboxOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);

  return (
    <div id="main" className="bg-[#333333] flex flex-row h-screen">
      <div className="leftSide w-[285px] "> </div>
      <div className="w-full">
        <SearchBar />
        <MenuBtn inboxOpen={setInboxOpen} taskOpen={setTaskOpen} />
        <ModalInbox isModalOpen={inboxOpen} />
        <ModalTask isModalOpen={taskOpen} />
      </div>
    </div>
  );
};

export default Main;
