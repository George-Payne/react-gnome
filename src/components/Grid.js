// @flow
const Gtk = imports.gi.Gtk;
import { Application } from 'components';

type Props = {
    halign ?: 'center';
    valign ?: 'center';
    rowSpacing ?: number;
}

class Window {
    instance: any;

    root: Application;
    props: Props;

    children: Set<*> = new Set();

    constructor(root: Application, props: Props) {
        this.root = root;
        this.props = props;

        this.instance = new Gtk.Grid({
            valign: Gtk.Align[(props.valign && props.valign.toUpperCase()) || 'CENTER'],
            halign: Gtk.Align[(props.halign && props.halign.toUpperCase()) || 'CENTER'],
            row_spacing: props.rowSpacing || 0,
        });
    }

    insertBefore(child: *, beforeChild: *) {
        this.instance.attach(child.instance, 0, this.children.size, 1, 1);
        this.children.add(child);
    }

    appendChild(child: *) {
        this.instance.attach(child.instance, 0, this.children.size, 1, 1);
        this.children.add(child);
    }

    removeChild(child: *) {
        this.instance.detach(child.instance);
        this.children.delete(child);
    }

    render() {
        this.children.forEach((child) => child.render());
    }
}

export default Window;
