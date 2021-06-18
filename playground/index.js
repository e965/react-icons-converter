import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import { createIconTreeFromSVG } from '../lib/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IconName = 'arrow-alt-circle-down-solid.svg';

const PathToIcon = path.join(__dirname, IconName);

const IconContent = readFileSync(PathToIcon, 'utf8');

const IconTree = createIconTreeFromSVG(IconContent);

console.log(JSON.stringify(IconTree, null, '  '));
