function SetHome() {
	const content = document.getElementById('content');

	let container = document.createElement('div');
    container.className = 'container';
	let home_header = document.createElement('h1');
	home_header.textContent = `LOREM IPSUM`;
	home_header.className = 'home_header';
	let home_text = document.createElement('div');
	home_text.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
	home_text.className = 'home_text'; 
	container.appendChild(home_header);
	container.appendChild(home_text);
	content.appendChild(container);
}

export {SetHome};