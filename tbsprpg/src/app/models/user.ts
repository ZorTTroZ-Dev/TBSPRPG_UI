import {Group} from './group';

export interface User {
    id: string;
    email: string;
    registrationComplete: string;
    token: string;
    groups: Group[];
    permissions: string[];
}
