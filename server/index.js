import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  },
});

// Routes
app.post('/api/resumes/upload', upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // In a real app, you would process the file here, extract text, etc.
    
    const resumeId = Date.now().toString();
    
    // Return response
    res.status(200).json({
      id: resumeId,
      filename: req.file.originalname,
      uploadDate: new Date(),
      status: 'pending',
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

app.get('/api/analyses/:resumeId', (req, res) => {
  const { resumeId } = req.params;
  
  // In a real app, you would fetch the analysis from a database
  // For now, return mock data
  
  setTimeout(() => {
    res.status(200).json({
      id: `analysis-${resumeId}`,
      resumeId,
      skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js'],
      missingSkills: ['AWS', 'Docker', 'GraphQL'],
      recommendedJobs: [
        {
          title: 'Frontend Developer',
          matchPercentage: 85,
          requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML'],
          description: 'Develop user interfaces for web applications',
        },
        {
          title: 'Full Stack Developer',
          matchPercentage: 70,
          requiredSkills: ['React', 'JavaScript', 'Node.js', 'MongoDB'],
          description: 'Build both frontend and backend of web applications',
        },
      ],
      strengths: [
        'Strong frontend development skills',
        'Experience with modern JavaScript frameworks',
        'Good understanding of UI/UX principles',
      ],
      improvements: [
        'Add cloud platform experience (AWS, Azure, etc.)',
        'Learn container technologies like Docker',
        'Gain experience with GraphQL for API development',
      ],
      date: new Date(),
    });
  }, 1500); // Simulate processing time
});

app.get('/api/resumes', (req, res) => {
  // In a real app, you would fetch resume history from a database
  // For now, return mock data
  
  res.status(200).json([
    {
      id: 'mock-resume-1',
      filename: 'my_professional_resume.pdf',
      uploadDate: new Date('2025-01-15'),
      status: 'completed',
    },
    {
      id: 'mock-resume-2',
      filename: 'resume_updated.pdf',
      uploadDate: new Date('2025-01-10'),
      status: 'completed',
    }
  ]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});