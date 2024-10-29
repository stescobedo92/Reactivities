import { action, makeObservable, observable } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export class ActivityStore {
    activitiesRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = true;

    constructor() {
        makeObservable(this, {
            activitiesRegistry: observable,
            selectedActivity: observable,
            editMode: observable,
            loading: observable,
            loadingInitial: observable,
            loadActivities: action,
            loadActivity: action,
            setLoadingInitial: action,
            createActivity: action,
            updateActivity: action,
            deleteActivity: action
        });
    }

    get activitiesByDate() {
        return Array.from(this.activitiesRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity: Activity) => {
                this.setActivity(activity);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private getActivity = (id: string) => {
        return this.activitiesRegistry.get(id);
    }

    private setActivity = (activity: Activity | undefined) => {
        if (activity) {
            activity.date = activity.date.split('T')[0];
            this.activitiesRegistry.set(activity.id, activity);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) this.selectedActivity = activity;
        else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.selectedActivity = activity;
                this.setLoadingInitial(false);
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            this.activitiesRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            this.activitiesRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            this.activitiesRegistry.delete(id);
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }
}