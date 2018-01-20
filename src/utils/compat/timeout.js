// @flow
// #!/usr/bin / gjs

const GLib = imports.gi.GLib;

function _setTimeoutInternal(continueTimeout, func, time) {
    return GLib.timeout_add(GLib.PRIORITY_DEFAULT, time, function () {
        func();
        return continueTimeout;
    });
}

function _clearTimeoutInternal(id) {
    if (id > 0) GLib.source_remove(id);
}

Object.defineProperties(window, {
    setTimeout: {
        value: _setTimeoutInternal.bind(undefined, GLib.SOURCE_REMOVE),
    },
    setInterval: {
        value: _setTimeoutInternal.bind(undefined, GLib.SOURCE_CONTINUE),
    },
    clearTimeout: {
        value: _clearTimeoutInternal,
    },
    clearInterval: {
        value: _clearTimeoutInternal,
    },
});
