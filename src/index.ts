import { parse as parseXML } from 'fast-xml-parser';
import type { X2jOptions as XMLParserOptionsType } from 'fast-xml-parser';

import type { IconTree as IconTreeType } from 'react-icons-lib-only';

import camelCase from 'camelcase';

export const createIconTreeFromSVG = (svgSource: string, isMultiColor: boolean): IconTreeType => {
    const XMLParserOptions: Partial<XMLParserOptionsType> = {
        ignoreAttributes: false,
        attributeNamePrefix: '',
        attrNodeName: 'attributes',
        textNodeName: '#text',
        allowBooleanAttributes: true,
        trimValues: false,
        arrayMode: true,
    };

    const XMLParserOptionForAttr = String(XMLParserOptions.attrNodeName ?? '');
    const XMLParserOptionForText = String(XMLParserOptions.textNodeName ?? '');

    const SVGObject = parseXML(svgSource, XMLParserOptions);

    const SVGObjectRootNodeName = Object.keys(SVGObject)[0];

    const createTreeAttrObject = (attributes: IconTreeType['attr'], nodeName: string): IconTreeType['attr'] => {
        return Object.keys(attributes)
            .filter(attributeName => {
                return ![
                    'class',
                    // if nodeName is svg, then some attributes are removed
                    ...(nodeName === 'svg' ? ['xmlns', 'xmlns:xlink', 'xml:space', 'width', 'height'] : []),
                ].includes(attributeName);
            })
            .reduce((attrObject: IconTreeType['attr'], attributeName) => {
                const AttributeValue = attributes[attributeName];
                const NewAttributeName = camelCase(attributeName);

                switch (NewAttributeName) {
                    case 'fill': {
                        if (AttributeValue === 'none' || AttributeValue === 'currentColor' || isMultiColor) {
                            attrObject[NewAttributeName] = AttributeValue;
                        }
                        break;
                    }
                    case 'pId':
                        break;
                    default: {
                        attrObject[NewAttributeName] = AttributeValue;
                        break;
                    }
                }

                return attrObject;
            }, {});
    };

    const createTreeFromSVGObject = (svgObjects: typeof SVGObject, nodeName: string): IconTreeType[] => {
        return svgObjects.map((svgObject: typeof SVGObject) => {
            let childrenKeys = Object.keys(svgObject).filter(key => {
                return !['style', XMLParserOptionForAttr, XMLParserOptionForText, 'defs', 'use'].includes(key);
            });

            // put at the end of the array of keys
            if (svgObject.defs) childrenKeys = [...childrenKeys, 'defs'];
            if (svgObject.use) childrenKeys = [...childrenKeys, 'use'];

            return {
                tag: nodeName,
                attr: createTreeAttrObject(svgObject[XMLParserOptionForAttr] ?? {}, nodeName),
                child: childrenKeys.flatMap(key => createTreeFromSVGObject(svgObject[key], key)),
            };
        });
    };

    const TreeFromSVGObject = createTreeFromSVGObject(SVGObject[SVGObjectRootNodeName], SVGObjectRootNodeName);

    return TreeFromSVGObject[0];
};
