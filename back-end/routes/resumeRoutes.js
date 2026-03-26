import express from 'express';
import { refineResume } from '../controllers/resumeController.js';

const router = express.Router();

// Define the endpoint for Card 1 (Refine Resume)
router.post("/refine-resume", refineResume);

// You can add more for Card 2, 3, and 4 here
// router.post('/build', buildResume);

export default router;