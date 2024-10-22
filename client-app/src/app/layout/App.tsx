import {useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import {v4 as uuid} from "uuid";
import agent from "../api/agent.ts";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
          setActivities(response);
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
      activity.id
          ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
          : setActivities([...activities, {...activity, id: uuid()}]);
      setEditMode(false);
      setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
      setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
      <>
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
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
            />
        </Container>
      </>
  )
}

export default App
