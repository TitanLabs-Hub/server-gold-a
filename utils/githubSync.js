const { Octokit } = require('@octokit/rest');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function getAllFiles(dir, fileList = []) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        await getAllFiles(filePath, fileList);
      }
    } else {
      // Include .env file but exclude other dot files and lock files
      if ((file === '.env' || (!file.startsWith('.') && !file.endsWith('.lock')))) {
        fileList.push(filePath);
      }
    }
  }

  return fileList;
}

async function getCurrentRepoFiles() {
  const { data: tree } = await octokit.git.getTree({
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    tree_sha: 'main',
    recursive: 1
  });
  
  return tree.tree.map(file => file.path);
}

async function syncWithGithub() {
  try {
    // Get current files in the local directory
    const localFiles = await getAllFiles('.');
    
    // Get current files in the repository
    const repoFiles = await getCurrentRepoFiles();
    
    // Get the current commit SHA
    const { data: ref } = await octokit.git.getRef({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      ref: 'heads/main'
    });
    const currentCommitSha = ref.object.sha;

    // Create a new tree
    const tree = [];
    
    // Add or update existing files
    for (const file of localFiles) {
      const content = await fs.readFile(file, 'utf8');
      const relativePath = path.relative('.', file);
      
      tree.push({
        path: relativePath,
        mode: '100644',
        type: 'blob',
        content
      });
    }
    
    // Mark deleted files, excluding .env
    const localFilePaths = localFiles.map(f => path.relative('.', f));
    for (const repoFile of repoFiles) {
      if (!localFilePaths.includes(repoFile) && repoFile !== '.env') {
        tree.push({
          path: repoFile,
          mode: '100644',
          type: 'blob',
          sha: null // This marks the file for deletion
        });
      }
    }

    const { data: newTree } = await octokit.git.createTree({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      base_tree: currentCommitSha,
      tree
    });

    // Create a new commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      message: 'Auto-sync after build (preserving .env file)',
      tree: newTree.sha,
      parents: [currentCommitSha]
    });

    // Update the reference
    await octokit.git.updateRef({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      ref: 'heads/main',
      sha: newCommit.sha
    });

    console.log('Successfully synced with GitHub!');
  } catch (error) {
    console.error('Error syncing with GitHub:', error);
    process.exit(1);
  }
}

syncWithGithub();