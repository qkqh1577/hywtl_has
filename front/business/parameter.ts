import {BusinessVO} from "business/domain";

export interface BusinessParameter extends Omit<BusinessVO, 'projectList'> {
}
