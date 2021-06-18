# react-icons-converter

SVG icon converter to format required for use with [react-icons](https://www.npmjs.com/package/react-icons) package.

Inspired by [matthova](https://github.com/matthova)'s [react-icons-json-generator](https://github.com/matthova/react-icons-converter) ([github](https://github.com/matthova/react-icons-converter)). The source code was taken from this project and modified.

¯\\_(ツ)_/¯

## Installation

-   `npm i react-icons-converter`

## Usage example

```js
import { GenIcon } from 'react-icons';
import { createIconTreeFromSVG } from 'react-icons-converter';

const SVGSource = ` /* here will be the source code of your svg icon */ `;

const IconTree = createIconTreeFromSVG(SVGSource);

export const Icon = GenIcon(IconTree);
```
