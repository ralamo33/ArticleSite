import React, { ReactElement } from "react";
import { getObject } from "../../../api/s3";


export default async function Article({params}: Params): Promise<ReactElement> {

    const key = params.key;

    const output = await getObject(key);

    const data = await output.Body?.transformToString();

    return <div>
        <h3>{key}</h3>
        <p>{data}</p>
    </div>
}

interface Params {
    params: {
        key: string;
    }
}