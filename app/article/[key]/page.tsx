import React, { ReactElement } from "react";
import { getArticleData } from "../../../api/s3";


export default async function Article({params}: Params): Promise<ReactElement> {

    const key = params.key;

    const data = await getArticleData(key);

    return <div>
        <h1 className="text-blue-600" itemScope itemType="https://schema.org/NewsArticle">{key}</h1>
        <p className="text-blue-600">{data.body}</p>
    </div>
}

interface Params {
    params: {
        key: string;
    }
}