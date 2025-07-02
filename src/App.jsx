import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FileUploadList from './components/FileUpload_List';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Subheader from './components/SubHeader';
import theme from './theme';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        {<Subheader />}
        
        <Routes>
          
          {/* Updated root route */}
          <Route path="/" element={<Navigate to="/home" /> } />
          <Route path="/upload-file" element={<FileUpload /> } />
          <Route path="/file-upload-list" element={<FileUploadList /> } />
          <Route path="/home" element={<HomePage />} />
          
          {/* Redirect to home for any unknown routes */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
