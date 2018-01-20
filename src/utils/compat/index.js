// @flow

import './console';
import './timeout';
import './websockets';


window.process = {
    env: {
        NODE_ENV: 'development'
    },
};
