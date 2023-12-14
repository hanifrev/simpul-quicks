import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactLoading from "react-loading";
import Image from "next/image";
import clock from "../assets/clock.svg";
import description from "../assets/description.svg";
import expand from "../assets/expand.svg";
import more from "../assets/more.svg";
import calendarIcon from "../assets/calendarIcon.svg";
import moment from "moment";
import axios from "axios";
import { debounce } from "lodash";

const Todo = ({ addTask, todoData }) => {
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState(null);
  const [desc, setDesc] = useState([]);
  const [checked, setCheked] = useState(false);
  const [theForm, setTheForm] = useState(false);
  const [accordion, setAccordion] = useState(null);
  const [deletePop, setDeletePop] = useState(null);
  const [todos, setTodos] = useState([]);

  const baseURL = `https://64292bae5a40b82da4cdd907.mockapi.io/todo`;

  const getTodo = async () => {
    const res = await axios.get(baseURL);
    setTodos(res.data);
  };

  useEffect(() => {
    getTodo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(baseURL, {
      title: inputValue,
      date: date,
      description: desc,
      completed: false,
    });
    setInputValue("");
    setDate(null);
    setDesc("");
    setTheForm(false);
    getTodo();
  };

  useEffect(() => {
    setTheForm(addTask);
  }, [addTask]);

  // useEffect(() => {
  //   setCheked(!checked);
  // }, [checked]);

  const handleCheckbox = async (id) => {
    await axios.put(`${baseURL}/${id}`, {
      completed: true,
    });
    // if (checked == true) {
    //   await axios.put(`${baseURL}/${id}`, {
    //     completed: false,
    //   });
    // } else if (checked == false) {
    //   await axios.put(`${baseURL}/${id}`, {
    //     completed: true,
    //   });
    // }
    getTodo();
  };

  const handleCalendar = (date, index, id) => {
    const newTodos = [...todos];
    newTodos[index].date = date;
    setTodos(newTodos);
    sendDateUpdate(id, date);
  };

  const sendDateUpdate = (id, date) => {
    axios.put(`${baseURL}/${id}`, {
      date: date,
    });
  };

  const handleDescription = (e, index, id) => {
    const updatedTasks = [...todos];
    updatedTasks[index].description = e.target.value;
    setDesc(updatedTasks);
    sendTaskUpdate(id, e.target.value);
  };

  const sendTaskUpdate = debounce((id, taskDescription) => {
    axios.put(`${baseURL}/${id}`, {
      description: taskDescription,
    });
  }, 3000);

  const deleteTodo = async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    getTodo();
  };

  const handleAccordion = (index) => {
    if (accordion == index) {
      setAccordion(null);
    } else {
      setAccordion(index);
    }
  };

  const handleDeletePop = (index) => {
    if (deletePop == index) {
      setDeletePop(null);
    } else {
      setDeletePop(index);
    }
  };

  return (
    <div id="todo">
      {theForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type Task Title"
            className="inputTitle text-black bg-transparent"
          />
          <div className="flex flex-row pl-9 pt-3">
            <Image src={clock} alt="img" className="w-[20px] mr-[18px]" />
            <DatePicker
              placeholderText="Set Date"
              selected={date}
              onChange={(date) => setDate(date)}
              className="bg-transparent datePick text-black"
            />
          </div>
          <div className="flex flex-row pl-9 pt-3">
            <Image
              src={description}
              alt="img"
              className="w-[15px] mr-[18px] -mt-[17px]"
            />
            <textarea
              value={desc}
              placeholder="No Description"
              onChange={(e) => setDesc(e.target.value)}
              className="bg-transparent textarea text-black"
            />
          </div>
          <div className="flex flex-row gap-4 justify-end my-4 cta">
            <button onClick={() => setTheForm(false)}>Cancel</button>
            <button>Add</button>
          </div>
        </form>
      )}

      {todos <= 0 ? (
        <div className="text-[#828282] text-center ">
          {/* No task, press New Task to add new one */}
          <ReactLoading
            className="mx-auto pt-[200px]"
            type="spin"
            color="#C4C4C4"
            height={64}
            width={64}
          />
          <span className="text-[#4f4f4f] flex justify-center pt-[5.5rem] font-medium">
            Loading Todo List ...
          </span>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={todo.id} className="todo-item text-black flex flex-col">
            <div
              className={`flex flex-row justify-between ${
                accordion == index ? "pb-3" : "pb-[19.5px]"
              }`}
            >
              <label className="flex flex-row ">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckbox(todo.id)}
                  className="check"
                />
                <p
                  className="font-bold text-lg"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </p>
              </label>
              <div className="flex flex-row">
                <div
                  className="text-[#EB5757] text-sm mr-5 mt-1"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {moment(todo.date).diff(moment(), "days")} days left
                </div>
                <div
                  className="text-sm mr-[10px] mt-1"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {moment(todo.date).format("MM/DD/YYYY")}
                </div>
                <div
                  className={`mr-[10px] pt-[5px] ${
                    accordion == index ? "transform rotate-180" : ""
                  }`}
                  onClick={() => handleAccordion(index)}
                >
                  <Image src={expand} alt="img" />
                </div>
                <div
                  className="mt-[13px]"
                  onClick={() => handleDeletePop(index)}
                >
                  <Image src={more} alt="img" />
                  {deletePop == index && (
                    <div
                      className="deletePopup text-red-600 cursor-pointer  "
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </div>
                  )}
                </div>
              </div>
            </div>

            {accordion == index && (
              <div className="accordion" key={index}>
                <div className="flex flex-row pl-9">
                  <Image src={clock} alt="img" className="w-[20px] mr-[18px]" />
                  <DatePicker
                    selected={new Date(todo.date)}
                    onChange={(date) => handleCalendar(date, index, todo.id)}
                    className="bg-transparent datePick"
                  />
                  {/* <Image
                    src={calendarIcon}
                    alt="img"
                    className="absolute mt-3 ml-[203px]"
                  /> */}
                </div>
                <div className="flex flex-row pl-9 pt-[13px]">
                  <Image
                    src={description}
                    alt="img"
                    className="w-[15px] mr-[18px] -mt-5"
                  />
                  <textarea
                    value={todo.description}
                    placeholder="No Description"
                    // onChange={(e) => handleDescription(e, index, todo.id)}
                    onChange={(e) => {
                      handleDescription(e, index, todo.id);
                      sendTaskUpdate(todo.id, e.target.value);
                    }}
                    className={`bg-transparent p-[15px] ml-1 w-[543px] ${
                      todo.description == 0 ? "" : "descActive"
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Todo;
