import Main_contents from "./components/Main_contents.jsx"
import Header from "./components/Header.jsx"
import TipsForm from "./components/TipsForm.jsx"
import { Routes, Route } from "react-router-dom"
import IrisForm from "./components/IrisForm.jsx"
import './App.css'

// test 주석
// 다시 test
function App() {


  return (
    <>
      <Header></Header>

      <Routes>
        <Route path="/tips" element={<TipsForm />}></Route>
        <Route path="/" element={<Main_contents />} ></Route>
        <Route path="/iris" element={<IrisForm />}></Route>
      </Routes>


    </>
  )
}

export default App
