// @flow
const Gtk = imports.gi.Gtk;
import { Application } from 'components';

type Props = {
    position ?: 'center';
    defaultHeight ?: number;
    defaultWidth ?: number;
    title: string;
}

class Window {
    window: *;

    root: Application;
    props: Props;

    children: Set<*> = new Set();

    constructor(root: Application, props: Props) {
        this.root = root;
        this.props = props;
        this.window = new Gtk.ApplicationWindow({
            application: root.application,
            window_position: Gtk.WindowPosition[(props.position && props.position.toUpperCase()) || 'CENTER'],
            default_height: props.defaultHeight || 200,
            default_width: props.defaultWidth || 400,
            title: props.title,
        });
    }

    appendChild(child: *) {
        this.window.add(child.instance);
        this.children.add(child);
    }

    removeChild(child: *) {
        this.window.remove(child.instance);
        this.children.delete(child);
    }

    render() {
        this.children.forEach((child) => child.render());
        this.window.show_all();
    }

}

export default Window;
