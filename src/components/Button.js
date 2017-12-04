// @flow
const Gtk = imports.gi.Gtk;
import { Application } from 'components';
import type TextNode from 'reconciler/TextNode';

type Props = {
    onPress: () => any,
}

class Button {
    instance: any;

    root: Application;
    props: Props;

    child: ?TextNode;

    constructor(root: Application, props: Props) {
        this.root = root;
        this.props = props;

        this.instance = new Gtk.Button({
            label: '',
        });

        if (props.onPress) {
            this.instance.connect('clicked', () => props.onPress());
        }
    }

    updateText(value: string) {
        this.instance.set_label(value);
    }

    appendChild(child: TextNode) {
        child.setParent(this);
        this.child = child;
    }

    removeChild() {
        this.child = null;
    }

    render() {
        this.instance.set_label(this.child ? this.child.value : '');
    }
}

export default Button;
