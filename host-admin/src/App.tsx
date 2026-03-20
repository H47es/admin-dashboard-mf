import React, { Suspense, useEffect, useState } from "react";

const Users = React.lazy(() => import("users/users"));
const Analytics = React.lazy(() => import("analytics/analytics"));

export default function App() {
    const [page, setPage] = useState("users");
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    useEffect(() => {
        const loadSharedStore = async () => {
            const store = await import("shared/store");

            store.selectedUser$.subscribe((user: string | null) => {
                setSelectedUser(user);
            });
        };

        loadSharedStore();
    }, []);

    return (
        <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: "200px",
                    background: "#1e293b",
                    color: "white",
                    padding: "20px"
                }}
            >
                <h2>Admin</h2>

                <div
                    style={{ cursor: "pointer", padding: "8px", borderRadius: "4px", marginBottom: "10px" }}
                    onClick={() => setPage("users")}
                >
                    Users
                </div>

                <div
                    style={{ cursor: "pointer", padding: "8px", borderRadius: "4px", }}
                    onClick={() => setPage("analytics")}
                >
                    Analytics
                </div>

                {/* Shared state display */}
                <div style={{ marginTop: "20px", fontSize: "14px" }}>
                    <strong>Selected User:</strong>
                    <div>{selectedUser ?? "None"}</div>
                </div>
            </aside>

            { /*Main Content*/}
            <main style={{ padding: "20px", flex: 1 }}>
                <Suspense fallback={<div>Loading...</div>}>
                    {page === "users" && <Users />}
                    {page === "analytics" && <Analytics />}
                </Suspense>
            </main>
        </div>
    );
}