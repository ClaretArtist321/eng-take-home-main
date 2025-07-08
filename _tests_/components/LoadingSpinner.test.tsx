import React from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { render } from '../utils/test-utils';

describe('LoadingSpinner', () => {
    it('renders with default props', () => {
        const { getByText } = render(<LoadingSpinner />);

        expect(getByText('Loading...')).toBeTruthy();
    });

    it('renders with custom text', () => {
        const customText = 'Searching for movies...';
        const { getByText } = render(<LoadingSpinner text={customText} />);

        expect(getByText(customText)).toBeTruthy();
    });

    it('renders with small size', () => {
        const { getByText } = render(<LoadingSpinner size="small" />);

        expect(getByText('Loading...')).toBeTruthy();
    });

    it('renders with large size', () => {
        const { getByText } = render(<LoadingSpinner size="large" />);

        expect(getByText('Loading...')).toBeTruthy();
    });

    it('renders with custom text and size', () => {
        const customText = 'Please wait...';
        const { getByText } = render(<LoadingSpinner text={customText} size="small" />);

        expect(getByText(customText)).toBeTruthy();
    });

    it('renders without crashing', () => {
        expect(() => render(<LoadingSpinner />)).not.toThrow();
    });
});