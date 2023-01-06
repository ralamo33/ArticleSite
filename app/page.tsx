import Link from "next/link";
import React, { ReactElement } from "react";

export default function HomePage(): ReactElement {
    return <div>
            <p>Home Page</p>
            <Link href="/article">Article</Link>
        </div>
}