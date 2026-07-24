import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { db } from "../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import PollShow from "./PollShow";

const AddFormPoll = () => {
  const currentUser: any = useSelector((state: any) => state.user);
  const [data, setData] = useState<any[]>([]);

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!question) {
      toast.error("Please enter a poll question");
      return;
    }
    if (!option1) {
      toast.error("Option 1 is required");
      return;
    }
    if (!option2) {
      toast.error("Option 2 is required");
      return;
    }
    if (!option3) {
      toast.error("Option 3 is required");
      return;
    }
    if (!option4) {
      toast.error("Option 4 is required");
      return;
    }

    try {
      await addDoc(collection(db, "polls"), {
        question: question,
        option_1: option1,
        option_2: option2,
        option_3: option3,
        option_4: option4,
        userEmail: currentUser.email,
        createdAt: new Date().getTime(),
        optionOne : [],
        optionTwo : [],
        optionThree : [],
        optionFour : [],
      });
      toast.success("Poll Created");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setQuestion("");
      getPolls();

    } catch (error) {
      console.log(error);
      toast.error(`Error in Poll Creation`);
    }
  };

  const getPolls = async () => {
    const querySnapshot = await getDocs(collection(db, "polls"));
    const firestoreData: any = [];
    querySnapshot.forEach((doc) => {
      firestoreData.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setData(firestoreData);
  };

  useEffect(() => {
    getPolls();
  }, []);


  return (
    <>
      {/* Polls UI */}
      <div className="flex justify-center items-center h-[calc(100vh-88px)] bg-gray-50 px-4 py-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white rounded-2xl shadow-lg shadow-[#3FA35E]/10 border border-gray-100 p-5 sm:p-6 space-y-4"
        >
          {/* Header */}
          <div className="space-y-0.5">
            <span className="inline-block text-[10px] font-semibold tracking-wider text-[#3FA35E] uppercase bg-[#3FA35E]/10 px-2.5 py-0.5 rounded-full">
              New Poll
            </span>
            <h2 className="text-xl font-bold text-gray-900 pt-1.5">
              Create your poll
            </h2>
            <p className="text-xs text-gray-400">
              Ask a question and give people up to four choices.
            </p>
          </div>

          {/* Question */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
              Question
            </label>
            <input
              type="text"
              placeholder="Enter your poll question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[#3FA35E] focus:ring-4 focus:ring-[#3FA35E]/10"
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">
              Options
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#3FA35E] bg-[#3FA35E]/10 w-4.5 h-4.5 flex items-center justify-center rounded-full">
                  1
                </span>
                <input
                  type="text"
                  placeholder="Enter option 1"
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[#3FA35E] focus:ring-4 focus:ring-[#3FA35E]/10"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#3FA35E] bg-[#3FA35E]/10 w-4.5 h-4.5 flex items-center justify-center rounded-full">
                  2
                </span>
                <input
                  type="text"
                  placeholder="Enter option 2"
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[#3FA35E] focus:ring-4 focus:ring-[#3FA35E]/10"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#3FA35E] bg-[#3FA35E]/10 w-4.5 h-4.5 flex items-center justify-center rounded-full">
                  3
                </span>
                <input
                  type="text"
                  placeholder="Enter option 3"
                  value={option3}
                  onChange={(e) => setOption3(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[#3FA35E] focus:ring-4 focus:ring-[#3FA35E]/10"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#3FA35E] bg-[#3FA35E]/10 w-4.5 h-4.5 flex items-center justify-center rounded-full">
                  4
                </span>
                <input
                  type="text"
                  placeholder="Enter option 4"
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[#3FA35E] focus:ring-4 focus:ring-[#3FA35E]/10"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#3FA35E] text-white rounded-lg px-6 py-2.5 text-sm font-semibold shadow-md shadow-[#3FA35E]/30 hover:bg-[#358f52] active:scale-[0.98] transition-all"
            >
              Create Poll
            </button>
          </div>
        </form>
      </div>

      {/* Polls Show Listing */}
      {/* Modern "All Polls" section - banner style */}
<div className="mx-auto mt-12 mb-8 w-full max-w-6xl px-4">
  <div
    className="relative overflow-hidden rounded-3xl px-6 py-7 sm:px-8 sm:py-8"
    style={{ background: "linear-gradient(120deg, #1F4D36 0%, #3FA35E 100%)" }}
  >
    {/* decorative circles */}
    <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
    <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />

    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Dashboard
        </span>
        <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">All Polls</h3>
        <p className="mt-1 text-sm text-white/75">Cast your vote and see live results instantly</p>
      </div>

      {/* stats row */}
      <div className="flex gap-6 sm:gap-8">
        <div className="flex items-center flex-col flex-col-reverse">
          <p className="text-2xl font-bold text-white sm:text-3xl">{data?.length ?? 0}</p>
          <p className="text-xs font-medium uppercase tracking-wide text-white/70">Active</p>
        </div>
      </div>
    </div>
  </div>
</div>

      <div className="grid sm:grid-cols-2 grid-cols-1">
        {data.map((single: any, idx: number) => {
          return <PollShow getPolls={getPolls} key={idx} idx={idx} data={single} />;
        })}
      </div>
    </>
  );
};

export default AddFormPoll;
