import { StoreProvider } from './context/StoreContext';
import AppContent from './AppContent';
import './index.css';

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
