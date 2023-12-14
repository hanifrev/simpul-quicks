import React, { useState } from "react";
import quickBtn from "../assets/quickBtn.svg";
import taskOn from "../assets/taskOn.svg";
import inboxOn from "../assets/inboxOn.svg";
import taskOff from "../assets/taskOff.svg";
import inboxOff from "../assets/inboxOff.svg";
import Image from "next/image";

const MenuBtn = ({ inboxOpen, taskOpen }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showTask, setShowTask] = useState(false);

  return (
    <div id="menuBtn" className="menu-container flex flex-row-reverse">
      <div
        className={`${
          showInbox || showTask ? "hidden" : "block pl-[26px] "
        } pt-6`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <Image src={quickBtn} alt="img" />
      </div>
      {showMenu && (
        <div className="flex flex-row-reverse gap-[26px] ">
          <div
            onClick={() =>
              setShowInbox(
                !showInbox,
                setShowTask(false),
                inboxOpen(!showInbox),
                taskOpen(false)
              )
            }
            className={`${showInbox ? "order-0" : "order-1"}`}
          >
            <p
              className={`${
                showInbox || showTask ? "hidden" : "block"
              } text-center transform -translate-y-3`}
            >
              Inbox
            </p>
            <Image
              src={showInbox ? inboxOn : inboxOff}
              className=" "
              alt="img"
            />
          </div>

          <div
            onClick={() =>
              setShowTask(
                !showTask,
                setShowInbox(false),
                taskOpen(!showTask),
                inboxOpen(false)
              )
            }
            className={`${showTask ? "order-0" : "order-2"}`}
          >
            <p
              className={`${
                showInbox || showTask ? "hidden" : "block"
              } text-center transform -translate-y-3`}
            >
              Task
            </p>
            <Image src={showTask ? taskOn : taskOff} alt="img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBtn;
