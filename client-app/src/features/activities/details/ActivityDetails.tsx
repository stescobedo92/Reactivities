import {Card, CardContent, CardDescription, CardHeader, CardMeta, Image, Button} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";

interface Props {
    activities: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({activities, cancelSelectActivity, openForm}: Props) {
  return (
      <Card fluid>
          <Image src={`/assets/categoryImages/${activities.category}.jpg`} />
          <CardContent>
              <CardHeader>{activities.title}</CardHeader>
              <CardMeta>
                  <span className='date'>{activities.date}</span>
              </CardMeta>
              <CardDescription>
                  {activities.description}
              </CardDescription>
          </CardContent>
          <CardContent extra>
              <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit' onClick={ () => openForm(activities.id) } />
                    <Button basic color='grey' content='Cancel' onClick={cancelSelectActivity} />
              </Button.Group>
          </CardContent>
      </Card>
  );
}