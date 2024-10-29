import {Grid} from "semantic-ui-react";
import ActivityList from "./AxctivityList.tsx";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";

export default observer(function ActivityDashboard() {

  const {activityStore} = useStore();
  const {loadActivities, activitiesRegistry} = activityStore;

    useEffect(() => {
        if (activitiesRegistry.size <= 1) loadActivities();
    }, [loadActivities]);

    if (activityStore.loadingInitial) return <LoadingComponent content={'Loading activities...'} />

  return (
    <Grid>
        <Grid.Column width='10'>
            <ActivityList />
        </Grid.Column>
        <Grid.Column width='6'>
            <h2>Activity filters</h2>
        </Grid.Column>
    </Grid>
  );
});