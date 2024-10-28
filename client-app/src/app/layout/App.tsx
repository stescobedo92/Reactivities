import {useEffect, useState} from "react";
import {Button, Container} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import agent from "../api/agent.ts";
import LoadingComponent from "./LoadingComponent.tsx";
import {v4 as uuid} from 'uuid';
import {useStore} from "../stores/store.ts";
import {observer} from "mobx-react-lite";

function App() {
  const {activityStore} = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
            const activities: Activity[] = [];
            response.forEach((activity: Activity) => {
                activity.date = activity.date.split('T')[0];
                activities.push(activity);
            });
            setActivities(activities);
            setLoading(false);
        });
  }, []);

  function handleSelectedActivity(id: string) {
      setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectedActivity() {
      setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
      id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
      setEditMode(true);
  }

  function handleFormClose() {
      setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
      setSubmitting(true);
      if (activity.id) {
          agent.Activities.update(activity).then(() => {
              setActivities([...activities.filter(x => x.id !== activity.id), activity]);
              setSelectedActivity(activity);
              setEditMode(false);
              setSubmitting(false);
          });
      } else {
          activity.id = uuid();
          agent.Activities.create(activity).then(() => {
              setActivities([...activities, activity]);
              setSelectedActivity(activity);
              setEditMode(false);
              setSubmitting(false);
          });
      }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
        setActivities([...activities.filter(x => x.id !== id)]);
        setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content={'Loading activities...'} />

  return (
      <>
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
            <h2>{activityStore.title}</h2>
            <Button content='Add exclamation!' positive onClick={activityStore.setTitle} />
            <ActivityDashboard
                activities={activities}
                selectedActivity={selectedActivity}
                selectActivity={handleSelectedActivity}
                cancelSelectActivity={handleCancelSelectedActivity}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                createOrEdit={handleCreateOrEditActivity}
                deleteActivity={handleDeleteActivity}
                submitting={submitting}
            />
        </Container>
      </>
  )
}

export default observer(App)
