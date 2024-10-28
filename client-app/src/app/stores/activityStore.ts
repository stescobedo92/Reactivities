import {action, makeObservable, observable} from "mobx";
import {Activity} from "../models/activity.ts";
import agent from "../api/agent.ts";

export class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
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
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity: Activity) => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
}