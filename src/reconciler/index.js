// @flow

import Reconciler from 'react-reconciler';

import { createElement, getHostContextNode } from 'utils';
import TextNode from './TextNode';

const GnomeRenderer = Reconciler({
    appendInitialChild(parentInstance, child) {
        if (parentInstance.appendChild) {
            parentInstance.appendChild(child);
        } else {
            parentInstance.document = child;
        }
    },

    createInstance(type, props) {
        return createElement(type, props);
    },

    createTextInstance(text) {
        return new TextNode(text);
    },

    scheduleDeferredCallback(func, time) {
        return setTimeout(func, time);
    },
    cancelDeferredCallback(id) {
        return clearTimeout(id);
    },

    finalizeInitialChildren() {
        return false;
    },

    getPublicInstance(inst) {
        return inst;
    },

    prepareForCommit() {
        // noop
    },

    prepareUpdate() {
        return true;
    },

    resetAfterCommit() {
        // noop
    },

    getRootHostContext(instance) {
        return getHostContextNode(instance);
    },

    getChildHostContext() {
        return {};
    },

    shouldSetTextContent() {
        return false;
    },

    shouldDeprioritizeSubtree() {
        return false;
    },

    now: () => 2,

    useSyncScheduling: true,

    mutation: {
        commitUpdate(instance, updatePayload, type, oldProps, newProps) {
            // if (updatePayload) {
            //     instance.processUpdate(oldProps, newProps);
            // }
            instance.render();
        },
        commitMount() {
            // TODO
        },
        commitTextUpdate(textInstance, oldText, newText) {
            textInstance.update(newText);
        },
        resetTextContent() {
            // TODO
        },
        appendChild(parentInstance, child) {
            if (parentInstance.appendChild) {
                parentInstance.appendChild(child);
            } else {
                parentInstance.document = child;
            }
        },
        appendChildToContainer(parentInstance, child) {
            if (parentInstance.appendChild) {
                parentInstance.appendChild(child);
            } else {
                parentInstance.document = child;
            }
        },
        insertBefore(parentInstance, child, beforeChild) {
            console.log('insertBefore');
            parentInstance.insertBefore(child, beforeChild)
        },
        insertInContainerBefore() {
            console.log('insertInContainerBefore');
            // TODO
        },
        removeChild(parentInstance, child) {
            parentInstance.removeChild(child);
        },
        removeChildFromContainer(parentInstance, child) {
            parentInstance.removeChild(child);
        },
    },
});

GnomeRenderer.injectIntoDevTools({
    bundleType: 1, // 0 for PROD, 1 for DEV
    version: '0.1.0',
    rendererPackageName: 'react-gnome', // package name
    findHostInstanceByFiber: GnomeRenderer.findHostInstance // host instance (root)
});

export default GnomeRenderer;
