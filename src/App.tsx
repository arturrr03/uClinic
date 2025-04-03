import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
//pages
import Home from "./src/pages/Home";
import Medic from "./src/pages/Medic";
import Schedule from "./src/pages/Schedule";
//components
import Frame from "./src/components/Frame";


const App  = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Plus Jakarta Suns", "sans-serif"].join(","),
      palette:{
        //red: "#FFFFFF",
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>

    <BrowserRouter>
    <Frame>

      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/medic" element = {<Medic/>}/>
        <Route path="/schedule" element = {<Schedule/>}/>
        
      </Routes>
    </Frame>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
