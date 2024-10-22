import {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import {v4 as uuid} from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5104/api/ActivityTask')
        .then(response => {
          console.log(response);
          setActivities(response.data);
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
            />
        </Container>
      </>
  )
}

export default App
