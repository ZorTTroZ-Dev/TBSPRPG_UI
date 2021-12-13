import {Group} from './group';

export interface User {
    id: string;
    username: string;
    token: string;
    groups: Group[];
    permissions: string[];
}
