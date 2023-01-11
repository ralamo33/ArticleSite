import React, { ReactElement, ReactNode } from "react";
import '../styles/globals.css'
import { AnalyticsWrapper } from "./components/analytics";

export default function RootLayout({children}: {children: ReactNode}): ReactElement {
    return <html>
        <body>
            <div>
              {children}
              <AnalyticsWrapper />
            </div>
        </body>
    </html>
}