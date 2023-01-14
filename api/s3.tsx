import { GetObjectCommand, GetObjectOutput, ListObjectsV2Command, ListObjectsV2Output, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    }
});

export function listArticles(): Promise<ListObjectsV2Output> {
    return s3Client.send(new ListObjectsV2Command({Bucket: process.env.BUCKET!}));
}

export async function getArticleData(key: string): Promise<ArticleData> {
    const raw = await s3Client.send(new GetObjectCommand({Bucket: process.env.BUCKET!, Key: key}))
    const body: any = raw.Body;
    const formatted =  await body.transformToString() as string;
    const delimiter = "-----"
    const split = formatted.split(delimiter)
    const title = split[0].replace("_", " ").split(".")[0];
    return {
        title: title,
        description: split[2],
        body: split[3],
        author: "Joseph Nagy",
        createdAt: raw.LastModified || new Date(),
        key: key
    }
}

export interface ArticleData {
    title: string;
    description: string;
    body: string;
    author: string;
    createdAt: Date;
    key: string;
}

