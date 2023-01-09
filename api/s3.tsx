import { GetObjectCommand, GetObjectOutput, ListObjectsV2Command, ListObjectsV2Output, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    }
});


export function listArticles(): Promise<ListObjectsV2Output> {
    return s3Client.send(new ListObjectsV2Command({Bucket: process.env.BUCKET_ARTICLES!}));
}

export function getArticle(key: string): Promise<GetObjectOutput> {
    return s3Client.send(new GetObjectCommand({Bucket: process.env.BUCKET_ARTICLES!, Key: key}))
}

export function getImageStatic(key: string): Promise<GetObjectOutput> {
    return s3Client.send(new GetObjectCommand({Bucket: process.env.BUCKET_STATIC!, Key: key}))
}
