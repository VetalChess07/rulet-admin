import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/providers/router';
import ThemeProvider from './app/providers/themeProvider/ui/ThemeProvider';

import { ErrorBoundary } from './app/providers/ErrorBoundary';

import '@app/styles/index.scss';
import { TelegramAuthProvider } from './app/providers/TelegramAuthProvider';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <TelegramAuthProvider>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </TelegramAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
