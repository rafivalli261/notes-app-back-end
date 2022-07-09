import {addNoteHandler, getAllNoteHandler, editNoteIdByHandler, getNoteByIdHandler, deleteNoteByIdHandler} from "./handler.js";

const routes = [
	{
		method: "POST",
		path: "/notes",
		handler: addNoteHandler,
	},
	{
		method: "GET",
		path: "/notes",
		handler: getAllNoteHandler,
	},
	{
		method: "PUT",
		path: "/notes/{id}",
		handler: editNoteIdByHandler,
	},
	{
		method: "GET",
		path: "/notes/{id}",
		handler: getNoteByIdHandler,
	},
	{
		method: "DELETE",
		path: "/notes/{id}",
		handler: deleteNoteByIdHandler,
	},
];

export default routes;
