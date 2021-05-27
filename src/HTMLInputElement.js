import HTMLElement from './HTMLElement';

export default class HTMLInputElement extends HTMLElement {
    constructor(tagName) {
        super(tagName);
        this.focus = this._focus;
        this.blur = this._blur;
        this.value = "";
    }

    set value(value) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    set onblur(fn) {
        this.fn = fn;
    }


    _blur() { 
        this.fn();
        wx.offKeyboardConfirm();
        wx.offKeyboardInput();
        wx.offKeyboardComplete();
        wx.hideKeyboard();
    }

    _focus() {
        wx.showKeyboard({
            defaultValue: this.value,
            maxLength: 256,
            multiple: false,
            confirmHold: true,
            complete: this.complete.bind(this)
        });
    }


    onKeyboardInput(value) {
        console.log("onKeyboardInput:", value)
        this.value = value;
    }

    complete(value) {
        console.log("complete:", value);
        wx.updateKeyboard({ value: this.value })

        wx.onKeyboardInput((data) => {
            let {value} = data;
            this.value = value;
        })

        wx.onKeyboardConfirm((data) => {
            let {value} = data;
            this.value = value;
            this._blur();
        });
        wx.onKeyboardComplete((data) => {
            let {value} = data;
            this.value = value;
        })
    }
};
