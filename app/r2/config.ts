import { S3 } from "aws-sdk";

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME || "";

const s3 = new S3({
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: "auto",
});

export const fetchObj = async (objKey: string) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: objKey,
  };

  try {
    const obj = s3.getObject(params).promise();

    return obj;
  } catch (error) {
    console.error("Failed to fetch object from R2 storage", error);
    throw new Error("Error while retrieving R2 object");
  }
};
