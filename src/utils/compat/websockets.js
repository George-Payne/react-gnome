// @flow

const Soup = imports.gi.Soup;

type EventName = 'open' | 'close' | 'error' | 'message';
type Event = { data: string };
type EventCb = (e: Event) => any;

class WebSocket {
    _session: *;
    _websocketConnection: *;

    constructor(uri: string){
        this._session = new Soup.Session();
        Soup.Session.prototype.add_feature.call(this._session, new Soup.ProxyResolverDefault());
        this._session.httpAliases = ['ws'];

        const logger = Soup.Logger.new(Soup.LoggerLogLevel.BODY, -1);
        logger.attach(this._session);
        logger.set_printer(function (logger, level, direction, data) {
            // $FlowFixMe
            print(data);
        });

        const message = new Soup.Message({
            method: 'GET',
            uri: new Soup.URI(uri)
        });

        this._session.websocket_connect_async(message, null, null, null, (session, res) => {
            this._websocketConnection = session.websocket_connect_finish(res);

            this._event('open', { data: '' });

            this._websocketConnection.connect('message', (connection, type, message) => {
                const data = message.get_data();
                this._event('message', { data });
            });

            this._websocketConnection.connect('closed', (connection, type, message) => {
                const data = message.get_data();
                this._event('close', { data });
            });

            this._websocketConnection.connect('error', (connection, type, message) => {
                const data = message.get_data();
                this._event('error', { data });
            });
        });
    }

    _event(eventType: EventName, e: Event) {
        this._listeners[eventType].forEach((fn) => fn(e));
    }

    _listeners = {
        open: [],
        close: [],
        error: [],
        message: [],
    }

    addEventListener(eventType: EventName, cb: EventCb) {
        switch (eventType) {
            case 'open': return this._listeners.open.push(cb);
            case 'close': return this._listeners.close.push(cb);
            case 'error': return this._listeners.error.push(cb);
            case 'message': return this._listeners.message.push(cb);
        }
    }

    removeEventListener(eventType: Event, cb: *) {
        switch (eventType) {
            case 'open': return this._listeners.open.filter((c) => c !== cb);
            case 'close': return this._listeners.close.filter((c) => c !== cb);
            case 'error': return this._listeners.error.filter((c) => c !== cb);
            case 'message': return this._listeners.message.filter((c) => c !== cb);
        }
    }

    send(message: string) {
        this._websocketConnection.send_text(message);
    }

    set onopen(cb) { this._listeners.open.push(cb) }
    set onclose(cb) { this._listeners.close.push(cb) }
    set onerror(cb) { this._listeners.error.push(cb) }
    set onmessage(cb) { this._listeners.message.push(cb) }
}

Object.defineProperties(window, {
    WebSocket: {
        value: WebSocket,
    },
});
