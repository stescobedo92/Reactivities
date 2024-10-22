import {Grid, List} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";

interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({activities}: Props) {
  return (
    <Grid>
        <Grid.Column width='10'>
            <List>
                { activities.map(activity => (
                    <List.Item key={activity.id}>
                        {activity.title}
                    </List.Item>
                ))}
            </List>
        </Grid.Column>
        <Grid.Column width='6'>
            <h2>Activity List</h2>
        </Grid.Column>
    </Grid>
  );
}