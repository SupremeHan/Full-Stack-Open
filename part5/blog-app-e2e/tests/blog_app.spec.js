const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blog app', () => {
	beforeEach(async ({ page, request }) => {
		await request.post('http:localhost:3003/api/testing/reset');
		await request.post('http:localhost:3003/api/users', {
			data: {
				name: 'Test User',
				username: 'testingtesting',
				password: 'Password123'
			}
		});

		await page.goto('http://localhost:5173');
	});

	test('front page can be opened', async ({ page }) => {
		const locator = await page.getByText('Login to application');
		await expect(locator).toBeVisible();
	});

	test('login form is shown', async ({ page }) => {
		await page.getByRole('button', { name: 'view' }).click();

		await expect(page.getByTestId('login-form')).toBeVisible();
	});

	describe('Login flow', () => {
		test('user login success', async ({ page }) => {
			await loginWith(page, 'testingtesting', 'Password123');

			await expect(page.getByText('Test User logged in')).toBeVisible();
		});

		test('user failed to login with an appropriate message', async ({ page }) => {
			await loginWith(page, 'randomUser', 'password123654');

			await expect(page.getByText('Wrong credentials')).toBeVisible();
		});
	});

	describe('When logged in', () => {
		beforeEach(async ({ page }) => {
			// we make sure user is logged in
			await loginWith(page, 'testingtesting', 'Password123');

			await page.getByRole('button', { name: 'Login' }).click();
		});

		test('a new blog can be created', async ({ page }) => {
			await createBlog(page, 'Playwrighting is fun!', 'Litkodmag', 'www.litkodmag.dev');

			await expect(page.getByText('Playwrighting is fun! Litkodmag')).toBeVisible();
		});

		test('a blog can be liked', async ({ page }) => {
			await createBlog(page, 'Playwrighting is fun!', 'Litkodmag', 'www.litkodmag.dev');

			await page.getByRole('button', { name: 'view' }).click();
			await expect(page.getByTestId('blog-likes')).toHaveText('likes 0');

			await page.getByRole('button', { name: 'like' }).click();

			await expect(page.getByTestId('blog-likes')).toHaveText('likes 1');
		});

		test('a user can delete a blog', async ({ page }) => {
			await createBlog(page, 'Playwrighting is fun!', 'Litkodmag', 'www.litkodmag.dev');

			await page.getByRole('button', { name: 'view' }).click();

			page.on('dialog', (dialog) => dialog.accept());
			await page.getByRole('button', { name: 'remove' }).click();

			await expect(page.getByText('Playwrighting is fun! Litkodmag')).not.toBeVisible();
		});

		test('created blog should be sorted by the number of likes', async ({ page }) => {
			await createBlog(page, 'Playwrighting is fun!', 'Litkodmag', 'www.litkodmag.dev');
			await createBlog(page, 'Playwrighting is fun!', 'Litkodmag', 'www.litkodmag.dev');
			await createBlog(page, 'Playwrighting is fun!', 'Litkodmag', 'www.litkodmag.dev');
		});
	});
});
