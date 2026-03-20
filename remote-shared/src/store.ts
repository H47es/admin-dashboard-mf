import { BehaviorSubject } from "rxjs";

export const selectedUser$ = new BehaviorSubject<string | null>(null);

export function selectedUser(name: string) {
    selectedUser$.next(name);
}