import { build } from 'vite';
import { execSync } from 'child_process';

async function buildProject() {
  try {
    console.log('Building client...');
    await build();
    
    console.log('Building server...');
    execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --target=node18', { stdio: 'inherit' });
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();