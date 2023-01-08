import Link from "next/link";
import React, { ReactElement } from "react";
import { listObjects } from "../api/s3";

export default async function HomePage(): Promise<ReactElement> {
    const output = await listObjects();
    return <div>
            <p>Home Page</p>
            {
                output.Contents?.map((obj) => {
                    const key = obj.Key;
                    return <div><Link key={key} href={`/article/${key}`}>{key}</Link></div>
                })
            }
        </div>
}