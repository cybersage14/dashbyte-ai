import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatDisplay from '../components/chatDisplay';

describe('ChatDisplay', () => {
    test('renders correctly', () => {
        const { container } = render(<ChatDisplay messages={[]} />);
        expect(container).toBeInTheDocument();
    });

    test('displays messages', () => {
        const messages = [
            { role: 'user', content: 'Hello' },
            { role: 'assistant', content: 'Hi there!' },
        ];
        render(<ChatDisplay messages={messages} />);
        const messageElements = screen.getAllByText(/.+/);
        expect(messageElements).toHaveLength(messages.length);
    });

    test('message order', () => {
        const messages = [
            { role: 'user', content: 'Hello' },
            { role: 'assistant', content: 'Hi there!' },
        ];
        render(<ChatDisplay messages={messages} />);
        const messageElements = screen.getAllByText(/.+/);
        messageElements.forEach((element, index) => {
            expect(element.textContent).toContain(messages[index].content);
        });
    });

    test('message content', () => {
        const messages = [
            { role: 'user', content: 'Hello' },
            { role: 'assistant', content: 'Hi there!' },
        ];
        render(<ChatDisplay messages={messages} />);
        messages.forEach((message) => {
            expect(screen.getByText(message.content)).toBeInTheDocument();
        });
    });
});
