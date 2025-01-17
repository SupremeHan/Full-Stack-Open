const loginWith = async (page, username, password) => {
	await page.getByRole('button', { name: 'view' }).click();

	await page.getByTestId('username').fill(username);
	await page.getByTestId('password').fill(password);

	await page.getByRole('button', { name: 'Login' }).click();
};

const createBlog = async (page, title, author, url) => {
	await page.getByRole('button', { name: 'new blog' }).click();

	await page.getByPlaceholder('Title').fill(title);
	await page.getByPlaceholder('Author').fill(author);
	await page.getByPlaceholder('Url').fill(url);

	await page.getByRole('button', { name: 'create' }).click();
};

export { loginWith, createBlog };
