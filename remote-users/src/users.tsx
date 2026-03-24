import React from "react";

export default function Users() {
    const users = [
        { id: 1, name: "Reese" },
        { id: 2, name: "Malcolm" },
        { id: 3, name: "Dewey" }
    ];

    const handleUserClick = async (name: string) => {
        const store = await import("shared/store");
        store.selectedUser(name);
    };

    return (
        <div>
            <h2>Users Module</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {users.map((u) => (
                    <li
                        key={u.id}
                        style={{
                            padding: "8px",
                            marginBottom: "6px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                        onClick={() => handleUserClick(u.name)}
                    >
                        {u.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}