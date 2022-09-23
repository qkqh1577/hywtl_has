import { AppRoute } from 'services/routes';

function Element() {
  return(
    <div>detail</div>
  )
}

const personnelDetailRoute:AppRoute = {
  path: '/user/hr-card-management/:id',
  element: <Element />
}

export default personnelDetailRoute;
