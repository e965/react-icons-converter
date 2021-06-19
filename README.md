# react-icons-converter

SVG icon converter to format required for use with [react-icons](https://www.npmjs.com/package/react-icons) package.

The source code was taken from [react-icons/logics.js](https://github.com/react-icons/react-icons/blob/master/packages/react-icons/scripts/logics.js) file and modified. The package name inspired by [react-icons-converter](https://github.com/matthova/react-icons-converter.sh).

¯\\_(ツ)_/¯

### Installation

-   `npm i react-icons-converter`

### Usage example

```js
import { GenIcon } from 'react-icons';
import { createIconTreeFromSVG } from 'react-icons-converter';

const SVGSource = ` /* here will be the source code of your svg icon */ `;

const IconTree = createIconTreeFromSVG(SVGSource);

export const Icon = GenIcon(IconTree);
```
