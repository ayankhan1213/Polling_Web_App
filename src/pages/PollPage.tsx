import AddFormPoll from '../components/AddFormPoll'
import  Header  from '../pages/Header'
import { Toaster } from "react-hot-toast";
const PollPage = () => {

  
  return (
    <div>
      <Header />
      <AddFormPoll />
      <Toaster position="top-center" />
    </div>
  )
}

export default PollPage