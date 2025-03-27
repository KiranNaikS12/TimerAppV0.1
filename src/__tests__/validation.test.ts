import { describe, expect, it, vi } from 'vitest';
import { validateTimerForm } from '../utils/validation';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('validateTimerForm', () => {
  it('should fail if title is empty', () => {
    const result = validateTimerForm({ title: '', description: '', hours: 1, minutes: 0, seconds: 0 });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Title is required');
  });

  it('should fail if title exceeds 50 characters', () => {
    const longTitle = 'A'.repeat(51);
    const result = validateTimerForm({ title: longTitle, description: '', hours: 1, minutes: 0, seconds: 0 });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Title must be less than 50 characters');
  });

  it('should fail if all time values are zero', () => {
    const result = validateTimerForm({ title: 'Valid Title', description: '', hours: 0, minutes: 0, seconds: 0 });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Please set a time greater than 0');
  });

  it('should pass with valid data', () => {
    const result = validateTimerForm({ title: 'Valid Timer', description: 'Testing', hours: 1, minutes: 10, seconds: 30 });
    expect(result).toBe(true);
  });
});
