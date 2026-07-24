import moment from "moment";
import { doc, deleteDoc } from "firebase/firestore";
import { message } from "antd";
import { db } from "../config/firebase";

const PollShow = ({ data, idx }: any) => {

  const handleDelete = async (id:string) => {
    message.success("Poll Deleted");
    try {
      await deleteDoc(doc(db, "polls", id));
    } catch (error) {
      console.log(error);
      message.error("Error in deleting Poll")
    }
  };

  return (
    <>
      <div
        className="flex items-center p-4 sm:p-8">
        <div className="w-full max-w-[100vw] rounded-3xl border border-[#E1EBE3] bg-white p-6 shadow-lg">
          {/* Question */}
          <h2 className="mb-5 text-md font-bold text-[#1F4D36]">
            {idx + 1} :{" "}
            <span className="text-gray-400 font-extralight">
              {data.question}
            </span>
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((num) => {
              const option = data[`option_${num}`];
              const percent = data[`percent_${num}`] ?? 0;

              return (
                <div
                  key={num}
                  className="relative overflow-hidden rounded-xl border border-[#E1EBE3] px-4 py-3 font-medium text-[#16241C] transition-colors hover:border-[#3FA35E] cursor-pointer"
                >
                  {/* progress fill */}
                  <div
                    className="absolute inset-y-0 left-0 bg-[#3FA35E]/15 transition-all duration-700 ease-out"
                    style={{ width: `${percent}%` }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span>{option}</span>
                    <span className="text-sm font-bold text-[#3FA35E]">
                      {percent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-[#EEF3EE] pt-4 text-xs text-[#6E7C74]">
            <span>
              Created by{" "}
              <span className="font-medium text-[#16241C]">
                {data.userEmail}
              </span>
            </span>
            <span>{moment(data.createdAt).calendar()}</span>
          </div>

          <div className=" flex justify-end pt-5">
            <button
              onClick={()=> {handleDelete(data.id)}}
              className="rounded-xl border border-[#F3C6C6] bg-[#FEF2F2] px-4 py-2 text-sm font-semibold text-[#DC2626] transition-colors hover:bg-[#DC2626] hover:text-white active:scale-[0.98]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PollShow;
