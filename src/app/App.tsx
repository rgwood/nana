import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

export default () => {
    return (
        <main>
            <h1 className="bg-blue-300 text-blue-700">Hello, world!!</h1>
        </main>
    );
};
