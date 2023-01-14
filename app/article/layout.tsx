import React, { ReactElement, ReactNode } from "react";

export default function ArticleLayout({children}: {children: ReactNode}): ReactElement {
    return (
        <>
            {children}
        </>
    )
}