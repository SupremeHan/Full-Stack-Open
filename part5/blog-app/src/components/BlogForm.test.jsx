import { render, screen } from '@testing-library/react';
import { BlogForm } from './BlogForm';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

test('should render component', async () => {
	const user = userEvent.setup();
	const createBlog = vi.fn();

	const newBlog = {
		title: 'Test title',
		author: 'Me',
		url: 'www.google.com'
	};

	render(<BlogForm addBlog={createBlog} />);

	const elem1 = screen.getByPlaceholderText('Title');
	const elem2 = screen.getByPlaceholderText('Author');
	const elem3 = screen.getByPlaceholderText('Url');

	await user.type(elem1, newBlog.title);
	await user.type(elem2, newBlog.author);
	await user.type(elem3, newBlog.url);

	await user.click(screen.getByTestId('blog-button'));

	expect(createBlog.mock.calls[0][0]).toEqual(newBlog);
});
