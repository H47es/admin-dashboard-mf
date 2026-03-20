import React, { useEffect, useState } from "react";
import { Subscription } from "rxjs";

export default function Analytics() {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    useEffect(() => {
        let subscription: any;

        const loadStore = async () => {
            const store = await import("shared/store");
            subscription = store.selectedUser$.subscribe(setSelectedUser);

            store.selectedUser$.subscribe((user: string | null) => {
                setSelectedUser(user);
            });
        };

        loadStore();

        return () => subscription?.unsubscribe();
    }, []);

    return (
        <div>
            <h2>Analytics Module</h2>

            <p><strong>Viewing analytics for:</strong> {selectedUser ?? "No user selected"}</p>

            <hr />

            <p>Total Users: 420</p>
            <p>Active Today: 67</p>
        </div>
    );
}