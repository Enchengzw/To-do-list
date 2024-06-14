
function SetContact() {
	const content = document.getElementById('content');

	let container = document.createElement('div');
    container.className = 'container';
	let contact_header = document.createElement('h1');
	contact_header.textContent = `CONTACT US`;
	contact_header.className = 'contact_header';

	let contact_one = document.createElement('div');
	contact_one.innerHTML =  `Person      : Lorem ipsum dolor sit amet.<br><br>
							  Email  	  : consectetur adipiscing elit.<br><br>
							  Phone Number: Ut enim ad minim veniam<br><br>`;
	contact_one.className = 'contact_person'; 

	let contact_two = document.createElement('div');
	contact_two.innerHTML =  `Person      : Lorem ipsum dolor sit amet.<br><br>
							  Email  	  : consectetur adipiscing elit.<br><br>
							  Phone Number: Ut enim ad minim veniam<br><br>`;
	contact_two.className = 'contact_person';

	container.appendChild(contact_header);
	container.appendChild(contact_one);
	container.appendChild(contact_two);
	content.appendChild(container);
}

export {SetContact}