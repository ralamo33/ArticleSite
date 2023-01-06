import React, { ReactElement, ReactNode } from "react";

export default function RootLayout({children}: {children: ReactNode}): ReactElement {
    return <html>
        <body>
            <h1>Article Site Layout!</h1>
            {children}
        </body>
    </html>
}