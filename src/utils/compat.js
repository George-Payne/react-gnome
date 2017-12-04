/* eslint-disable */
// @flow

// #!/usr/bin / gjs

const GLib = imports.gi.GLib;

const _log = log;
const __log = (a) => {
    if (typeof a === 'string') {
        _log(a)
    } else {
        try {
            _log(a.toString());
        } catch (e) {
            _log('unsupported argument passed to console.log :(');
        }
    }
}

window.console = {
    log: (...args) => args.map(__log),
    warn: (...args) => args.map(__log),
    error: (...args) => args.map(__log),
}

function _setTimeoutInternal(continueTimeout, func, time) {
    return GLib.timeout_add(GLib.PRIORITY_DEFAULT, time, function () {
        func();
        return continueTimeout;
    });
}

function _clearTimeoutInternal(id) {
    if (id > 0) GLib.source_remove(id);
}

window.setTimeout = _setTimeoutInternal.bind(undefined, GLib.SOURCE_REMOVE);
window.setInterval = _setTimeoutInternal.bind(undefined, GLib.SOURCE_CONTINUE);
window.clearTimeout = _clearTimeoutInternal;
window.clearInterval = _clearTimeoutInternal;

window.process = {
    env: {
        NODE_ENV: 'development'
    },
};
