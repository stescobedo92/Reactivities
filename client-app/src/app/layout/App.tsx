import {useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import agent from "../api/agent.ts";
import LoadingComponent from "./LoadingComponent.tsx";
import {useStore} from "../stores/store.ts";
import {observer} from "mobx-react-lite";

function App() {
  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
        setActivities([...activities.filter(x => x.id !== id)]);
        setSubmitting(false);
    });
  }

  if (activityStore.loadingInitial) return <LoadingComponent content={'Loading activities...'} />

  return (
      <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
            <ActivityDashboard
                activities={activityStore.activities}
                deleteActivity={handleDeleteActivity}
                submitting={submitting}
            />
        </Container>
      </>
  )
}

export default observer(App)
