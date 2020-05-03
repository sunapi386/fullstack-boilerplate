import { S3 } from "aws-sdk/clients/all"
import { AWS_S3_BUCKET, S3_CONFIG } from "./config"
// "bucket": "fancyimages",
// "key": "AKIA3SDAS7437JAS2GJI",
// "secret": "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"

// AWS
export const s3 = new S3(S3_CONFIG)

// Function to generate presigned url.
// Uploading to s3 from the browser using presigned url
// https://medium.com/@aakashbanerjee/upload-files-to-amazon-s3-from-the-browser-using-pre-signed-urls-4602a9a90eb5
// 1. User submits a form with a file from frontend.
// 2. Instead of POSTing to backend, request backend for a AWS S3 pre-signed URL to store this file on S3 directly.
// 3. Backend sends frontend this generated, pre-signed url
// 4. Frontend directly upload the file to AWS S3 using pre-signed URL.

export const generatePreSignedUrl = async (
  filename: string,
  signedUrlExpireSeconds: number,
  contentType: string,
): Promise<string> => {
  const params = {
    Bucket: AWS_S3_BUCKET,
    Key: filename,
    Expires: signedUrlExpireSeconds,
    ContentType: contentType,
    ACL: "public-read",
  }
  const url = await s3.getSignedUrlPromise("putObject", params)

  console.log("Presigned URL:", url)
  return url
}
