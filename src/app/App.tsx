import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

export default function () {
    return (
        <main>
            <h1 className="bg-blue-100 text-blue-700 text-2xl text-center">Hello world!</h1>
        </main>
    );
};
