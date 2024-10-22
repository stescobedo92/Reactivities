import {useEffect, useState} from "react";
import axios from "axios";
import {Header, List} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5104/api/ActivityTask')
        .then(response => {
          console.log(response);
          setActivities(response.data);
        });
  }, []);

  return (
      <div>
        <Header as='h2' icon='users' content='Reactivities' />
        <List>
          { activities.map(activity => (
                <List.Item key={activity.id}>
                  {activity.title}
                </List.Item>
          ))}
        </List>
      </div>
  )
}

export default App
