const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware')
const { getNotes, getNoteById, deleteNote, updateNote, createNote } = require('../controllers/noteController');

// Get All Notes
router.route('/').get(protect, getNotes)

// Create a note
router.route("/create").post(protect, createNote);

router.route('/:id')
// Get One Note
        .get(protect, getNoteById)
// Delete A Note
        .delete(protect, deleteNote)
//    Update A Note
        .put(protect, updateNote)

// router.route('/:id').get().put().delete();

module.exports = router;