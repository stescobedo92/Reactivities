import {Card, CardContent, CardDescription, CardHeader, CardMeta, Image, Button} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import LoadingComponent from "../../../app/layout/LoadingComponent.tsx";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export default observer (function ActivityDetails() {
  const {activityStore} = useStore();
  const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadActivity(id).then(r => console.log(r));
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent />;

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
                    <Button basic color='blue' content='Edit' />
                    <Button basic color='grey' content='Cancel' />
              </Button.Group>
          </CardContent>
      </Card>
  );
});