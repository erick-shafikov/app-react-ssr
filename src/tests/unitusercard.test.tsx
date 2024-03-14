import { test, expect, beforeEach } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import UserCard from "../components/users/UserCard";
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
	render(
		<BrowserRouter>
			<UserCard user={
				{ id: 1, email: 'test@test.ru', username: 'admin' }
			} />
		</BrowserRouter>
	)
});

test('User Card Texts', () => {
	expect(screen.findByText(/test@test.ru/i)).toBeDefined();
	expect(screen.findByText(/admin/i)).toBeDefined();
	expect(screen.getByText(/profile/i)).toBeDefined();
});

test('Click to link', () => {
	const link = screen.getByText(/profile/i);
	fireEvent.click(link);

	// mb await
});