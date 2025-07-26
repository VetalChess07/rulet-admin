
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/providers/router';
import ThemeProvider from './app/providers/themeProvider/ui/ThemeProvider';

import { ErrorBoundary } from './app/providers/ErrorBoundary';

function App() {
  return (
  
      <ThemeProvider>
        <BrowserRouter>
          <ErrorBoundary>
                <AppRouter />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
  
  );
}

export default App;
