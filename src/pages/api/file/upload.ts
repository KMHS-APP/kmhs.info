import type { APIRoute } from 'astro';
import { S3 } from 'ultralight-s3'

// @ts-ignore
export const GET: APIRoute = async () => {
    const s3 = new S3({
        endpoint: 'https://746d73ba4e96119e08764d56a9438ff6.r2.cloudflarestorage.com/file',
        accessKeyId: import.meta.env.accessKeyId,
        secretAccessKey: import.meta.env.secretAccessKey,
        bucketName: 'file',
        region: 'apac', //optional -  by default is auto
        maxRequestSizeInBytes: 5242880, // optional - by default is 5MB
        requestAbortTimeout: undefined, // optional - for aborting requests
        logger: console, // optional - for debugging
    });

    return await s3.list()
}
