// @flow

const Gtk = imports.gi.Gtk;

class Application {
    Name = 'Getting the Signal';
    application = new Gtk.Application();
    portals: Array<*> = [];
    startup: () => any;

    constructor() {
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    _onActivate() {
        this.portals.forEach((portal) => {
            portal.present();
        });
    }

    _onStartup() {
        this.startup();
    }

    onStartup(fn: *) {
        this.startup = fn;
    }
}

export default Application;
