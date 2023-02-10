import {AppRoute} from 'services/routes';
import React from "react";
import Minyoungpage from "../view/Page";

function Element() {

    return (
        <h2>'minyoung'</h2>
    )
}

const minyoungPageRoute: AppRoute = {
    path: '/minyoung-study',
    element: <Element/>,
};

export default minyoungPageRoute;