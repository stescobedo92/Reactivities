import {Grid} from "semantic-ui-react";
import ActivityList from "./AxctivityList.tsx";
import ActivityDetails from "../details/ActivityDetails.tsx";
import ActivityForm from "../form/ActivityForm.tsx";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";

export default observer(function ActivityDashboard() {

  const {activityStore} = useStore();
  const {selectedActivity, editMode} = activityStore;

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content={'Loading activities...'} />

  return (
    <Grid>
        <Grid.Column width='10'>
            <ActivityList />
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedActivity && !editMode &&
                <ActivityDetails />
            }
            {
                editMode &&
                <ActivityForm />
            }
        </Grid.Column>
    </Grid>
  );
});