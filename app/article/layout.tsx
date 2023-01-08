import React, { ReactElement, ReactNode } from "react";

export default function ArticleLayout({children}: {children: ReactNode}): ReactElement {
    return (
        <>
            <h2>These are the best articles ever!</h2>
            {children}
        </>
    )
}