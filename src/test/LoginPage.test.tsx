import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ToastProvider } from '../components/ui/Toast';
import { LoginPage } from '../features/auth/LoginPage';

describe('LoginPage Component', () => {
  test('renders login title and quick fill buttons', () => {
    render(
      <Provider store={store}>
        <ToastProvider>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </ToastProvider>
      </Provider>
    );

    expect(screen.getByText('ApexFin Analytics')).toBeInTheDocument();
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.getByText('Viewer User')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In to Analytics Hub/i })).toBeInTheDocument();
  });

  test('updates email input when quick fill admin button is clicked', () => {
    render(
      <Provider store={store}>
        <ToastProvider>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </ToastProvider>
      </Provider>
    );

    const viewerBtn = screen.getByText('Viewer User');
    fireEvent.click(viewerBtn);

    const emailInput = screen.getByPlaceholderText('admin@acme.com') as HTMLInputElement;
    expect(emailInput.value).toBe('viewer@acme.com');
  });
});
