// Windows npm scripts have no portable `VAR=value cmd` prefix, so wrap it.
import { spawn } from 'node:child_process';

const [, , ...args] = process.argv;
spawn('npx', ['next', ...args], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, NEXT_BUILD_DIR: '.next-build' },
}).on('exit', (code) => process.exit(code ?? 0));
