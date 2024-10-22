import {Card, CardContent, CardDescription, CardHeader, CardMeta, Image, Button} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";

interface Props {
    activities: Activity;
}

export default function ActivityDetails({activities}: Props) {
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
                    <Button basic color='blue' content='Edit' />
                    <Button basic color='grey' content='Cancel' />
              </Button.Group>
          </CardContent>
      </Card>
  );
}