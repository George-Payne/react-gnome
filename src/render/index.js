// @flow

import GnomeRenderer from 'reconciler';
import { createElement } from 'utils';

function render(element: *) {
    const container = createElement('ROOT');
    const node = GnomeRenderer.createContainer(container);

    // $FlowFixMe
    container.onStartup(() => {
        GnomeRenderer.updateContainer(element, node, null);

        // $FlowFixMe
        container.document.render();
    });

    // $FlowFixMe
    container.application.run(ARGV);
}

export default render;
