import {action, makeObservable, observable} from "mobx";
import {Activity} from "../models/activity.ts";
import agent from "../api/agent.ts";

export class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;

    constructor() {
        makeObservable(this, {
            activities: observable,
            selectedActivity: observable,
            editMode: observable,
            loading: observable,
            loadingInitial: observable,
            loadActivities: action
        });
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity: Activity) => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            });
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }
}