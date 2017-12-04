// @flow

class TextNode {
    value: string;
    _parent: *;

    constructor(value: string) {
        this.value = value;
    }

    setParent(parent: *) {
        this._parent = parent;
    }

    update(newValue: string) {
        this.value = newValue;
        this._parent.updateText(newValue);
    }
}

export default TextNode;
