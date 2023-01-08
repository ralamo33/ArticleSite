import React, { ReactElement } from "react";
import { getObject, listObjects } from "../../../api/s3";


export default async function Article({params}: Params): Promise<ReactElement> {

    const key = params.key;

    const output = await getObject(key);

    const body: any = output.Body;
    const data: string = await body.transformToString();

    return <div>
        <h3>{key}</h3>
        <p>{data}</p>
    </div>
}

export async function generateStaticParams() {
    const output = await listObjects();

    return output.Contents?.map((obj) => ({
        key: obj.Key,
    }))
    // return [{key: 'GamerGirl.txt'}]
}

interface Params {
    params: {
        key: string;
    }
}