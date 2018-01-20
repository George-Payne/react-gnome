// @flow

const _log = log;
const __log = (a: any) => {
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

Object.defineProperties(window, {
    console: {
        value: {
            log: (...args: *) => args.map(__log),
            warn: (...args: *) => args.map(__log),
            error: (...args: *) => args.map(__log),
        },
    }
});
