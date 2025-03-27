import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTimerModal from '../components/modals/AddTimerModal';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/useTimerStore';


describe('AddTimerModal Component', () => {
  const mockOnClose = vi.fn();

  const renderWithRedux = (component: React.ReactNode) =>
    render(<Provider store={store}>{component}</Provider>);

  it('renders when isOpen is true', () => {
    renderWithRedux(<AddTimerModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Add New Timer')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const { container } = renderWithRedux(<AddTimerModal isOpen={false} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('updates input fields correctly', () => {
    renderWithRedux(<AddTimerModal isOpen={true} onClose={mockOnClose} />);
    
    const titleInput = screen.getByPlaceholderText('Enter timer title');
    fireEvent.change(titleInput, { target: { value: 'New Timer' } });
    expect(titleInput).toHaveValue('New Timer');
  });

  it('validates form before submission', async() => {
    renderWithRedux(<AddTimerModal isOpen={true} onClose={mockOnClose} />);
    
    const submitButton = screen.getByText('Add Timer');
    fireEvent.click(submitButton);
    
    expect(await screen.findByRole('alert')).toHaveTextContent(/Title is required/i);

  });

  it('calls onClose when close button is clicked', () => {
    renderWithRedux(<AddTimerModal isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByTitle('Close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});
