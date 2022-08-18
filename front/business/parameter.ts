import {BusinessVO} from "./domain";

export interface BusinessParameter extends Omit<BusinessVO, 'projectList'> {
}
