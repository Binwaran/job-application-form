import './App.css'
import { Toaster } from "react-hot-toast";
import JobApplicationForm from "./components/JobApplicationForm"

function App() {
  return (
    <>
      <Toaster />
      <JobApplicationForm />
    </>
  );
}

export default App;