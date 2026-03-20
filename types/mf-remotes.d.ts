declare module "users/users" {
    const Users: React.ComponentType;
    export default Users;
}

declare module "analytics/analytics" {
    const Analytics: React.ComponentType;
    export default Analytics;
}

declare module "shared/store" {
    import { BehaviorSubject } from "rxjs";

    export const selectedUser$: BehaviorSubject<string | null>;
    export function selectUser(name: string): void;
}