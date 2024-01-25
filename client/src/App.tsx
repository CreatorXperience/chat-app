import { useCallback, useState } from "react";
import "./Tailwind.css"
import Formic from "./components/form";
import Navigation from "./components/navigation";

function App() {
  const [isSignup,setIsSignUp] = useState(false)

  let setIsSignupCallback =  useCallback(setIsSignUp, [])
  return (
    <div className="w-[100%] h-[100vh] bg-slate-900">
    <Navigation />
    <Formic signup={isSignup} setIsSignup={setIsSignUp}/>
    </div>
  )
}

export default App;
