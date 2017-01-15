console.log('Starting notes.js...');
const fs = require('fs');
const _ = require('lodash');

let fetchNotes = () => {
	try{
		let noteString = fs.readFileSync('notes-data.json');
		return JSON.parse(noteString);
	} catch (e) {
		return [];
	}
};

let saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
	let notes = fetchNotes();
	let note = {
		title,
		body
	}
	let duplicateNotes = notes.filter((note) => note.title === title);
	if(duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

let getAll = () => {
	return fetchNotes();
};

let readNote = (title) => {
	let notes = fetchNotes();
	return notes.filter((note) => note.title === title)[0]
};

let deleteNote = (title) => {
	let notes = fetchNotes();
	let filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(notes);
	return notes.length !== filteredNotes.length;
}

let logNote = (note) => {
	if (_.isUndefined(note)){ 
		console.log('Note not found')
	} else { 
		console.log(`Title: ${note.title}`);
		console.log(`Body: ${note.body}`);
	}
}

module.exports = {
	addNote,
	getAll,
	readNote,
	deleteNote,
	logNote
};
