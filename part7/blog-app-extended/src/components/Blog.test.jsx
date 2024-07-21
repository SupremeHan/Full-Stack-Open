import { render, screen } from '@testing-library/react';
import { Blog } from './Blog';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

test('Blog component renders the content as expected', () => {
	const blog = {
		title: 'Testing is fun',
		author: 'Me',
		url: 'www.testingisfun.dev',
		likes: 100,
		user: {}
	};

	render(<Blog blog={blog} />);

	expect(screen.getByTestId('blog-title')).toBeDefined();
	expect(screen.getByTestId('togglabel')).toHaveStyle({ display: 'none' });
});

test('Blog content should be show on button click', async () => {
	const blog = {
		title: 'Testing is fun',
		author: 'Me',
		url: 'www.testingisfun.dev',
		likes: 100,
		user: {}
	};

	render(<Blog blog={blog} />);

	const user = userEvent.setup();
	const button = screen.getByTestId('show-button');
	await user.click(button);

	expect(screen.getByTestId('blog-likes')).toBeVisible();
});

test('based on the number of click, like functon should be called asequally', async () => {
	const blog = {
		title: 'Testing is fun',
		author: 'Me',
		url: 'www.testingisfun.dev',
		likes: 100,
		user: {}
	};

	const likesFnMock = vi.fn();

	render(<Blog blog={blog} addLike={likesFnMock} />);

	const user = userEvent.setup();
	const button = screen.getByTestId('likes-button');
	//click1
	await user.click(button);
	//click2
	await user.click(button);

	expect(likesFnMock).toHaveBeenCalled(2);
});
