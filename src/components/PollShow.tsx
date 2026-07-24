import moment from "moment";
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const PollShow = ({ data, idx, getPolls }: any) => {
  const currentUser: any = useSelector((state: any) => state.user);

  const checkUser = useSelector((state: any) => state.user);
  console.log(data);

  const handleDelete = async (id: string) => {
    toast.success("Poll Deleted");
    getPolls();
    try {
      await deleteDoc(doc(db, "polls", id));
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting Poll");
    }
  };

  const handleOptions = async (options: string, pollsId: string) => {
    const currentEmail = currentUser?.email;
    const updatedPoll = { ...data };
    const docRef = doc(db, "polls", pollsId);
    const docSnap = await getDoc(docRef);
    const latestDatafromFirebase: any = docSnap.data();
    const allVotes = [
      ...latestDatafromFirebase.optionOne,
      ...latestDatafromFirebase.optionTwo,
      ...latestDatafromFirebase.optionThree,
      ...latestDatafromFirebase.optionFour,
    ];

    updatedPoll[options] = [...updatedPoll[options], currentEmail];
    if (allVotes.includes(currentEmail)) {
      toast.error("You have already voted");
    } else {
      try {
        await setDoc(doc(db, "polls", pollsId), updatedPoll);
        toast.success("You Voted");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const totalVotes =
    data.optionOne.length +
    data.optionTwo.length +
    data.optionThree.length +
    data.optionFour.length;

  return (
    <>
      <div className="flex items-center p-4 sm:p-8">
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
            <div
              onClick={() => {
                handleOptions("optionOne", data.id);
              }}
              className="relative overflow-hidden rounded-xl border border-[#E1EBE3] px-4 py-3 font-medium text-[#16241C] transition-colors hover:border-[#3FA35E] cursor-pointer"
            >
              <div
                className="absolute inset-y-0 left-0 bg-[#3FA35E]/15 transition-all duration-700 ease-out"
                style={{
                  width: `${(data.optionOne.length / totalVotes) * 100}%`,
                }}
              />
              <div className="relative flex items-center justify-between">
                <span>{data.option_1}</span>
                <span className="text-sm font-bold text-[#3FA35E]">
                  {Math.floor((data.optionOne.length / totalVotes) * 100)}%
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-[#E1EBE3] px-4 py-3 font-medium text-[#16241C] transition-colors hover:border-[#3FA35E] cursor-pointer">
              <div
                className="absolute inset-y-0 left-0 bg-[#3FA35E]/15 transition-all duration-700 ease-out"
                style={{
                  width: `${(data.optionTwo.length / totalVotes) * 100}%`,
                }}
              />
              <div
                onClick={() => {
                  handleOptions("optionTwo", data.id);
                }}
                className="relative flex items-center justify-between"
              >
                <span>{data.option_2}</span>
                <span className="text-sm font-bold text-[#3FA35E]">
                  {Math.floor((data.optionTwo.length / totalVotes) * 100)}%{" "}
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-[#E1EBE3] px-4 py-3 font-medium text-[#16241C] transition-colors hover:border-[#3FA35E] cursor-pointer">
              <div
                className="absolute inset-y-0 left-0 bg-[#3FA35E]/15 transition-all duration-700 ease-out"
                style={{
                  width: `${(data.optionThree.length / totalVotes) * 100}%`,
                }}
              />
              <div
                onClick={() => {
                  handleOptions("optionThree", data.id);
                }}
                className="relative flex items-center justify-between"
              >
                <span>{data.option_3}</span>
                <span className="text-sm font-bold text-[#3FA35E]">
                  {Math.floor((data.optionThree.length / totalVotes) * 100)}
                  %{" "}
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-[#E1EBE3] px-4 py-3 font-medium text-[#16241C] transition-colors hover:border-[#3FA35E] cursor-pointer">
              <div
                className="absolute inset-y-0 left-0 bg-[#3FA35E]/15 transition-all duration-700 ease-out"
                style={{
                  width: `${(data.optionFour.length / totalVotes) * 100}%`,
                }}
              />
              <div
                onClick={() => {
                  handleOptions("optionFour", data.id);
                }}
                className="relative flex items-center justify-between"
              >
                <span>{data.option_4}</span>
                <span className="text-sm font-bold text-[#3FA35E]">
                  {Math.floor((data.optionFour.length / totalVotes) * 100)}
                  %{" "}
                </span>
              </div>
            </div>
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

          {checkUser.email == data.userEmail ? (
            <div className=" flex justify-end pt-5">
              <button
                onClick={() => {
                  handleDelete(data.id);
                }}
                className="rounded-xl border border-[#F3C6C6] bg-[#FEF2F2] px-4 py-2 text-sm font-semibold text-[#DC2626] transition-colors hover:bg-[#DC2626] hover:text-white active:scale-[0.98]"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PollShow;
