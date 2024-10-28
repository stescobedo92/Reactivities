import {makeObservable} from "mobx";

export class ActivityStore {
    title = 'Hello from MobX';

    constructor() {
        makeObservable(this);
    }

    setTitle = () => {
        this.title = this.title + '!';
    }
}