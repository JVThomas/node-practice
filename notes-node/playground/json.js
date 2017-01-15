//let obj = {
	//name: "Justin Thomas"
//};

//converts object to string
//let stringObj = JSON.stringify(obj);

//typeof lets you observe object's type
//console.log(typeof stringObj);
//console.log(stringObj);

//let personString = '{"name": "Justin","age": 25}';

//converts string to object
//let person = JSON.parse(personString);
//console.log(typeof person);
//console.log(person);
//

const fs = require('fs');

let originalNote ={
	title: 'Some title',
	body: 'Some body'
}

let originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);
let noteString = fs.readFileSync('notes.json');

let note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);
