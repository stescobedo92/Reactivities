import {Grid} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import ActivityList from "./AxctivityList.tsx";

interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({activities}: Props) {
  return (
    <Grid>
        <Grid.Column width='10'>
            <ActivityList activities={activities} />
        </Grid.Column>
        <Grid.Column width='6'>
            <h2>Activity List</h2>
        </Grid.Column>
    </Grid>
  );
}