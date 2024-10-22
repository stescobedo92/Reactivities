import {Grid} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import ActivityList from "./AxctivityList.tsx";
import ActivityDetails from "../details/ActivityDetails.tsx";
import ActivityForm from "../form/ActivityForm.tsx";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
}

export default function ActivityDashboard({activities, selectActivity, selectedActivity, cancelSelectActivity}: Props) {
  return (
    <Grid>
        <Grid.Column width='10'>
            <ActivityList activities={activities} selectActivity={selectActivity} />
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedActivity && <ActivityDetails activities={selectedActivity} cancelSelectActivity={cancelSelectActivity} />}
            <ActivityForm />
        </Grid.Column>
    </Grid>
  );
}