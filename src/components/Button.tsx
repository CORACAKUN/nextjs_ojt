"use client";

import { useState } from "react";

export default function ToggleText() {
    const [show, setShow] = useState(false);
    return (
        <div className="p-2 flex flex-col items-center gap-4">
            {show && <p className="mt-2 text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores voluptatum, maxime vero modi dolorum dolores temporibus dolorem cumque beatae ea, quod illum culpa autem ratione. Natus modi neque nostrum voluptatum.</p>}
            <button className="px-8 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setShow(!show)}>
                Toggle
            </button>
        </div>
    );
}