import type { APIRoute } from "astro";
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';

const asKey = import.meta.env.AS_KEY;
const pvKey = import.meta.env.PV_KEY;

const s3Client = new S3Client({ 
  region: "your-region",
  endpoint: "https://cnd4nhjxbijr.compat.objectstorage.ap-seoul-1.oraclecloud.com",
  credentials: {
    accessKeyId: asKey,
    secretAccessKey: pvKey,
  },
});

export const PUT: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';

    let file: File | null = null;
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      file = formData.get("file") as File;
    } else if (contentType === 'application/octet-stream') {
      const arrayBuffer = await request.arrayBuffer();
      file = new File([arrayBuffer], 'uploaded-file', { type: contentType });
    }

    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    const fileStream = file.stream();
    const hash = createHash('md5');
    const chunks: Uint8Array[] = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
      hash.update(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);
    const md5Hash = hash.digest('hex');

    // Check if a file with the same MD5 hash already exists
    const listObjectsCommand = new ListObjectsV2Command({
      Bucket: "bucket-oci",
      Prefix: "kmhs-info/",
    });
    const listObjectsResponse = await s3Client.send(listObjectsCommand);

    for (const item of listObjectsResponse.Contents || []) {
      const headObjectCommand = new HeadObjectCommand({
        Bucket: "bucket-oci",
        Key: item.Key,
      });
      const headObjectResponse = await s3Client.send(headObjectCommand);

      if (headObjectResponse.Metadata?.md5Hash === md5Hash) {
        const getObjectParams = {
          Bucket: "bucket-oci",
          Key: item.Key,
        };
        const url = await getSignedUrl(s3Client, new GetObjectCommand(getObjectParams), { expiresIn: 7 * 24 * 60 * 60 });
        return new Response(JSON.stringify({ message: 'File already exists', url }), { status: 200 });
      }
    }

    const fileName = uuidv4();

    const uploadParams = {
      Bucket: "bucket-oci",
      Key: `kmhs-info/${fileName}`,
      Body: fileBuffer,
      ContentType: file.type,
      Metadata: {
        md5Hash,
      },
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const getObjectParams = {
      Bucket: "bucket-oci",
      Key: `kmhs-info/${fileName}`,
    };

    const url = await getSignedUrl(s3Client, new GetObjectCommand(getObjectParams), { expiresIn: 7 * 24 * 60 * 60 });

    return new Response(JSON.stringify({ message: 'File uploaded successfully', url }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error uploading file', { status: 500 });
  }
};
