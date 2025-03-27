import Image from "next/image";
import ToDoList from "./components/ToDoList";

export default function Home() {

  const list = [
    {
      id: 1,
      title: "Task 1",
      completed: false,
    },
    {
      id: 2,
      title: "Task 2",
      completed: true,
    },
    {
      id: 3,
      title: "Task 3",
      completed: false,
    },
  ]

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-lg md:w-3xl bg-black p-8 rounded-lg shadow-lg justify-items-center">
        <div className="text-xl md:text-5xl font-bold text-white">To Do List</div>
        <ToDoList list={list}/>
      </div>
    </div>
  );
}
