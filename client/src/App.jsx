import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import PublicLayout from './components/templates/PublicLayout/PublicLayout';
import AdminLayout from './components/templates/AdminLayout/AdminLayout';

// Páginas
import HomePage from './components/pages/HomePage/HomePage';
import BookViewPage from './components/pages/BookViewPage/BookViewPage';
import AddEntryPage from './components/pages/AddEntryPage/AddEntryPage';
import AdminPage from './components/pages/AdminPage/AdminPage';
import AdminDownloadPage from './components/pages/AdminDownloadPage/AdminDownloadPage';
import AdminSettingsPage from './components/pages/AdminSettingsPage/AdminSettingsPage';

function App() {
  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(10px)',
          }
        }}
      />
      
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookViewPage />} />
          <Route path="/add" element={<AddEntryPage />} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="download" element={<AdminDownloadPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
