import './App.css';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import Layout from './ui/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Service from './views/Service';
import Contact from './views/Contact';

function App() {
  // const muiTheme = useTheme();
  // const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/service" element={<Service />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          </Routes>
        </Layout>
      </>
  );
}

export default App;
