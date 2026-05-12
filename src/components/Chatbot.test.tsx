import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Chatbot from './Chatbot';
import * as gemini from '../lib/gemini';

// Mock the generateChatResponse function
vi.mock('../lib/gemini', () => ({
  generateChatResponse: vi.fn(),
}));

describe('Chatbot Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders closed by default with launcher button', () => {
    render(<Chatbot />);
    
    // Check if the open button exists
    const launcher = screen.getByLabelText(/Ouvrir l'assistant virtuel/i);
    expect(launcher).toBeInTheDocument();
    
    // The dialog should be hidden (using our aria-hidden or class check)
    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toHaveAttribute('aria-hidden', 'true');
  });

  it('opens and closes the chat dialog', async () => {
    const user = userEvent.setup();
    render(<Chatbot />);
    
    const launcher = screen.getByLabelText(/Ouvrir l'assistant virtuel/i);
    
    // Open
    await user.click(launcher);
    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('aria-hidden', 'false');
    expect(screen.getByText('Assistant KRB')).toBeVisible();
    
    // Close using the header close button
    const closeBtn = screen.getByLabelText('Fermer le chat');
    await user.click(closeBtn);
    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('aria-hidden', 'true');
  });

  it('sends a message and displays the response', async () => {
    const user = userEvent.setup();
    const mockReponse = { text: 'Ceci est une réponse simulée.' };
    
    // @ts-ignore
    vi.mocked(gemini.generateChatResponse).mockImplementation(async () => {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 100));
      return mockReponse;
    });
    
    render(<Chatbot />);
    
    // Open chat
    await user.click(screen.getByLabelText(/Ouvrir l'assistant virtuel/i));
    
    // Input a message
    const input = screen.getByPlaceholderText('Posez votre question...');
    await user.type(input, 'Bonjour le monde');
    
    // Send message
    const sendBtn = screen.getByLabelText('Envoyer');
    await user.click(sendBtn);
    
    // Check that user message is displayed
    expect(screen.getByText('Bonjour le monde')).toBeInTheDocument();
    
    // Wait for the response to appear
    await waitFor(() => {
      expect(screen.getByText('Ceci est une réponse simulée.')).toBeInTheDocument();
    });
    
    // Check if API was called correctly
    expect(gemini.generateChatResponse).toHaveBeenCalledWith(
      'Bonjour le monde',
      []
    );
  });
});
