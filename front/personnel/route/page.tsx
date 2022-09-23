import { AppRoute } from 'services/routes';

function Element() {
  return(
    <div>page</div>
  )
}

const personnelPageRoute:AppRoute = {
  path: '/user/hr-card-management',
  element: <Element />
}

export default personnelPageRoute;
