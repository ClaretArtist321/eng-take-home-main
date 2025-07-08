import React from 'react';
import { EmptyState } from '../../components/EmptyState';
import { render } from '../utils/test-utils';

describe('EmptyState', () => {
    const defaultProps = {
        title: 'No Movies Found',
        message: 'Try searching for something else'
    };

    it('renders with required props', () => {
        const { getByText } = render(<EmptyState {...defaultProps} />);

        expect(getByText('No Movies Found')).toBeTruthy();
        expect(getByText('Try searching for something else')).toBeTruthy();
        expect(getByText('🎬')).toBeTruthy(); // default icon
    });

    it('renders with custom icon', () => {
        const customIcon = '🔍';
        const { getByText } = render(
            <EmptyState {...defaultProps} icon={customIcon} />
        );

        expect(getByText(customIcon)).toBeTruthy();
        expect(getByText('No Movies Found')).toBeTruthy();
        expect(getByText('Try searching for something else')).toBeTruthy();
    });

    it('renders with different title and message', () => {
        const customProps = {
            title: 'Connection Error',
            message: 'Please check your internet connection and try again'
        };

        const { getByText } = render(<EmptyState {...customProps} />);

        expect(getByText('Connection Error')).toBeTruthy();
        expect(getByText('Please check your internet connection and try again')).toBeTruthy();
    });

    it('renders without crashing', () => {
        expect(() => render(<EmptyState {...defaultProps} />)).not.toThrow();
    });

    it('renders with empty strings', () => {
        const emptyProps = {
            title: '',
            message: ''
        };

        expect(() => render(<EmptyState {...emptyProps} />)).not.toThrow();
    });

    it('renders with long text', () => {
        const longTextProps = {
            title: 'This is a very long title that should still be displayed correctly',
            message: 'This is a very long message that contains a lot of text and should be displayed correctly in the empty state component without any issues'
        };

        const { getByText } = render(<EmptyState {...longTextProps} />);

        expect(getByText(longTextProps.title)).toBeTruthy();
        expect(getByText(longTextProps.message)).toBeTruthy();
    });
});