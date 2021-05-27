import HTMLInputElement from './HTMLInputElement';

export default class HTMLTextAreaElement extends HTMLInputElement {
    constructor(tagName) {
        super(tagName);
    }

    _focus() {
        wx.showKeyboard({
            defaultValue: this.value,
            maxLength: 256,
            multiple: true,
            confirmHold: true,
            complete: this.complete.bind(this)
        });
    }


};
