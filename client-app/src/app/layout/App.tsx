import {useEffect } from "react";
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import LoadingComponent from "./LoadingComponent.tsx";
import {useStore} from "../stores/store.ts";
import {observer} from "mobx-react-lite";

function App() {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content={'Loading activities...'} />

  return (
      <>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
            <ActivityDashboard />
        </Container>
      </>
  )
}

export default observer(App)
