import React, { ReactElement, ReactNode } from "react";
import '../styles/globals.css'

export default function RootLayout({children}: {children: ReactNode}): ReactElement {
    return <html>
        <body>
            <div>
              {children}
            </div>
        </body>
    </html>
}