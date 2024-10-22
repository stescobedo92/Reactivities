import {Grid} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import ActivityList from "./AxctivityList.tsx";
import ActivityDetails from "../details/ActivityDetails.tsx";

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
            {activities[0] && <ActivityDetails activities={activities[0]} />}
        </Grid.Column>
    </Grid>
  );
}