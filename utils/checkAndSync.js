const { execSync } = require('child_process');

// Check if we're running on Vercel
const isVercel = process.env.VERCEL === '1';

if (!isVercel) {
  console.log('Running in development environment, executing GitHub sync...');
  try {
    require('./githubSync.js');
  } catch (error) {
    console.error('Failed to run GitHub sync:', error);
    process.exit(1);
  }
} else {
  console.log('Running on Vercel, skipping GitHub sync...');
}