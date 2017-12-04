// @flow

import {
    Application,
    Button,
    Grid,
    Label,
    Window,
} from 'components';

let ROOT_NODE_INSTANCE: Application;

function getHostContextNode(rootNode: any) {
    if (typeof rootNode !== 'undefined') {
        return ROOT_NODE_INSTANCE = rootNode;
    } else {
        console.warn(`${rootNode} is not an instance of officegen docx constructor.`);

        return ROOT_NODE_INSTANCE = new Application();
    }
}

type ComponentType = 'ROOT' | 'WINDOW' | 'LABEL' | 'GRID';

type Components = {
    [key: string]: () => *;
}

function createElement(type: ComponentType, props: any = {}) {
    const COMPONENTS: Components = {
        ROOT: () => new Application(),
        WINDOW: () => new Window(ROOT_NODE_INSTANCE, props),
        BUTTON: () => new Button(ROOT_NODE_INSTANCE, props),
        LABEL: () => new Label(ROOT_NODE_INSTANCE, props),
        GRID: () => new Grid(ROOT_NODE_INSTANCE, props),
    };

    return COMPONENTS[type]() || undefined;
}

export {
    createElement,
    getHostContextNode,
};
