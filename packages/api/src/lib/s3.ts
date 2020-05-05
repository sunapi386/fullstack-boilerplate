import AWS from "aws-sdk"
import { AWS_S3_BUCKET, S3_CONFIG, S3_URL } from "./config"

// AWS
export const s3 = new AWS.S3(S3_CONFIG)

// Function to generate presigned url.
// Uploading to s3 from the browser using presigned url
// https://medium.com/@aakashbanerjee/upload-files-to-amazon-s3-from-the-browser-using-pre-signed-urls-4602a9a90eb5
// 1. User submits a form with a file from frontend.
// 2. Instead of POSTing to backend, request backend for a AWS S3 pre-signed URL to store this file on S3 directly.
// 3. Backend sends frontend this generated, pre-signed url
// 4. Frontend directly upload the file to AWS S3 using pre-signed URL.

export const generatePreSignedUrl = (
  filename: string,
  contentType: string,
  bucket?: string,
  signedUrlExpireSeconds?: number,
): string => {
  const params = {
    Bucket: bucket || AWS_S3_BUCKET,
    Key: filename,
    Expires: signedUrlExpireSeconds ? signedUrlExpireSeconds : 60 * 5,
    ContentType: contentType,
    // todo: make a entity table to separate internal key vs. filename
    // so that attachment; filename="filename.jpg" can work
    // ContentDisposition: `inline; filename=${filename}`,
    ACL: "public-read",
  }
  const url = s3.getSignedUrl("putObject", params)
  console.log("filename", filename, "contentType", contentType)
  console.log("Presigned URL:", url)
  console.log("Accessible at URL:", `${S3_URL}${filename}`)
  return url
}

export const signedDownloadUrl = (
  key: string,
  bucket?: string,
  signedUrlExpireSeconds?: number,
) => {
  const url = s3.getSignedUrl("getObject", {
    Bucket: bucket || AWS_S3_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds || 60 * 5,
  })
  console.log("signedDownloadUrl at URL:", `${S3_URL}${key}`)
  return url
}
