console.log('Starting app.js...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
}

const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
}


const argv = yargs
	.command('add','Add a new note', {
		title: titleOptions,
		body: bodyOptions
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: titleOptions,
		body: bodyOptions
	})
	.command('delete', 'Delete a note', {
		title: titleOptions,
		body: bodyOptions
	})
	.help()
	.argv;

let command = process.argv[2];
console.log('Yargs', argv);

if (command === 'add'){
	let note = notes.addNote(argv.title, argv.body);
	notes.logNote(note);
}else if(command === 'list'){
	let noteArray = notes.getAll();
	console.log('---');
	if(noteArray.length > 0){
		noteArray.forEach((note) => {
			console.log('---');
			notes.logNote(note);
			console.log('---');
		});
	} else {
		console.log('No notes saved');
	}
	console.log('---');
}else if (command === 'read'){
	let note = notes.readNote(argv.title);
	notes.logNote(note);
}else if (command === 'delete'){
	notes.deleteNote(argv.title) ? console.log(`${argv.title} note removed!`) : console.log(`Title: ${argv.title} note not found!`);
}else{
	console.log('Command not found');
}
