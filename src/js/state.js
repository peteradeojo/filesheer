const updateDisplayName = () => {
	const {
		state: { username, name_display: nameDisplay },
	} = window;

	// console.log(name_display);
	nameDisplay ? (nameDisplay.textContent = username) : undefined;
};

module.exports = { updateDisplayName };
