import createHttpError from "http-errors";
import { Note } from "../models/note.js";



export const getAllNotes = async (req, res, next) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const skipDocuments = (page - 1) * perPage;

  const notesQuery = Note.find();
  if (tag) {
    notesQuery.where('tag').equals(tag);
  }
  if (search) {
    notesQuery.or([
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ]);
  }

  try {
    const [totalNotes, notes] = await Promise.all([
      notesQuery.clone().countDocuments(),
      notesQuery.skip(skipDocuments).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({ page, perPage, totalNotes, totalPages, notes });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findByIdAndUpdate(noteId, req.body, {
      returnDocument: 'after',
    });

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findByIdAndDelete(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
