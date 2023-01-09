import React, { ReactElement } from "react";
import { getArticle, listArticles } from "../../../api/s3";


export default async function Article({params}: Params): Promise<ReactElement> {

    const key = params.key;

    const output = await getArticle(key);
    const body: any = output.Body;
    const data: string = await body.transformToString();

    return <div>
        <h3 className="text-blue-600">{key}</h3>
        <p className="text-blue-600">{data}</p>
    </div>
}

interface Params {
    params: {
        key: string;
    }
}