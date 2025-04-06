import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
//pages
import Home from "./src/pages/Home";
import Medic from "./src/pages/Medic";
import Schedule from "./src/pages/Schedule";
import Login from "./src/pages/Login";
//components
import Frame from "./src/components/Frame";
import Profile from "./src/pages/Profile";
import Regis from "./src/pages/Regis";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Plus Jakarta Suns", "sans-serif"].join(","),
    },
    palette: {
      //red: "#FFFFFF",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* Rute di dalam Frame */}
          
          <Route path="/home" element={<Frame><Home /></Frame>} />
          <Route path="/medic" element={<Frame><Medic /></Frame>} />
          <Route path="/schedule" element={<Frame><Schedule /></Frame>} />
          <Route path="/profile" element={<Frame><Profile /></Frame>} />

         
          <Route path="/" element={<Login />} />
          <Route path= "/regis" element= {<Regis/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;