import {nanoid} from "nanoid";
import notes from "./notes.js";
const addNoteHandler = (request, h) => {
	const {title, tags, body} = request.payload;
	const id = nanoid(16);
	const createdAt = new Date().toISOString();
	const updatedAt = createdAt;
	console.log(createdAt);
	const newNote = {
		title,
		tags,
		body,
		id,
		createdAt,
		updatedAt,
	};

	notes.push(newNote);
	console.log(...notes);
	const isSuccess = notes.filter((note) => note.id === id).length > 0;
	//	console.log(isSuccess);
	if (isSuccess) {
		const response = h.response({
			status: "Success",
			message: "Data berhasil ditambahkan",
			data: {
				noteId: id,
			},
		});

		response.code(201);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "Data gagal ditambahkan",
	});
	response.code(500);
	return response;
};

const getAllNoteHandler = () => ({
	status: "Success",
	data: {
		notes,
	},
});

const editNoteIdByHandler = (request, h) => {
	const {id} = request.params;

	const {title, tags, body} = request.payload;

	const updatedAt = new Date().toISOString();
	const index = notes.findIndex((note) => note.id === id);

	if (index !== -1) {
		notes[index] = {
			...notes[index],
			title,
			tags,
			body,
			updatedAt,
		};

		const response = h.response({
			status: "success",
			message: "Catatan berhasil diperbarui",
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "gagal memperbarui catatan. Id tidak ditemukan",
	});
	response.code(404);
	return response;
};

const getNoteByIdHandler = (request, h) => {
	const {id} = request.params;
	const note = notes.filter((n) => n.id === id)[0];

	if (note !== undefined) {
		return {
			status: "success",
			data: {
				note,
			},
		};
	}

	const response = h.response({
		status: "fail",
		message: "catatan tidak ditemukan",
	});

	response.code(404);
	return response;
};

const deleteNoteByIdHandler = (request, h) => {
	const {id} = request.params;
	const index = notes.findIndex((note) => note.id === id);
	if (index !== -1) {
		notes.splice(index, 1);
		const response = h.response({
			status: "success",
			message: "Catatan berhasil dihapus",
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "catatan gagal dihapus. Id tidak ditemukan",
	});
	response.code(404);
	return response;
};

export {addNoteHandler, getAllNoteHandler, editNoteIdByHandler, getNoteByIdHandler, deleteNoteByIdHandler};