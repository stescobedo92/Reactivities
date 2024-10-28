import {Card, CardContent, CardDescription, CardHeader, CardMeta, Image, Button} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";

export default function ActivityDetails() {
  const {activityStore} = useStore();
  const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

  if (!activity) return <LoadingComponent />;

  return (
      <Card fluid>
          <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
          <CardContent>
              <CardHeader>{activity.title}</CardHeader>
              <CardMeta>
                  <span className='date'>{activity.date}</span>
              </CardMeta>
              <CardDescription>
                  {activity.description}
              </CardDescription>
          </CardContent>
          <CardContent extra>
              <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit' onClick={ () => openForm(activity.id) } />
                    <Button basic color='grey' content='Cancel' onClick={cancelSelectedActivity} />
              </Button.Group>
          </CardContent>
      </Card>
  );
}