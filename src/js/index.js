const { io } = require('socket.io-client');

function arrayBufferToBase64(Arraybuffer, Filetype, fileName) {
	let url = '';
	if (Filetype in ['video/x-matroska', 'audio/mp3', 'video/mp4']) {
		const blob = new Blob(Arraybuffer);
		url = URL.createObjectURL(blob);
	} else {
		let binary = '';
		const bytes = new Uint8Array(Arraybuffer);
		const len = bytes.byteLength;
		for (let i = 0; i < len; i += 1) {
			binary += String.fromCharCode(bytes[i]);
		}
		/* eslint-disable */
		const file = window.btoa(binary);
		const mimType =
			Filetype === 'pdf'
				? 'application/pdf'
				: Filetype === 'xlsx'
				? 'application/xlsx'
				: Filetype === 'pptx'
				? 'application/pptx'
				: Filetype === 'csv'
				? 'application/csv'
				: Filetype === 'docx'
				? 'application/docx'
				: Filetype === 'jpg'
				? 'application/jpg'
				: Filetype === 'png'
				? 'application/png'
				: Filetype === 'mkv'
				? 'video/x-matroska'
				: '';
		/* eslint-enable */
		url = `data:${Filetype};base64,${file}`;
	}

	const a = document.createElement('a');
	a.href = url;
	a.innerText = fileName;
	a.download = fileName;
	// document.body.appendChild(a);
	return a;
}

const username = 'johndoe';

const state = {
	registered: false,
	username: undefined,
};

const socket = io();

socket.on('connect', () => {
	socket.emit('register', username);
	socket.on('registered', (result) => {
		if (result) {
			state.registered = true;
			state.username = username;
		}

		console.log(state);
	});

	socket.on('file-shared', (file) => {
		console.log(file);

		const linkElement = arrayBufferToBase64(file.data, file.type, file.name);
		const li = document.createElement('li');
		li.appendChild(linkElement);

		document.querySelector('#file-list').appendChild(li);
	});
});

document.querySelector('#file-input')?.addEventListener('submit', async (e) => {
	e.preventDefault();
	const form = e.target;
	/**
	 * @type File
	 */
	const file = form.file.files[0];

	if (!file) {
		return undefined;
	}

	if (file.size / (1024 * 1024) > 20) {
		alert('File too big');
		return undefined;
	}

	const data = await file.arrayBuffer();

	socket.emit('share', state, {
		file: {
			data,
			name: file.name,
			type: file.type,
			size: file.size,
		},
	});

	return undefined;
});
