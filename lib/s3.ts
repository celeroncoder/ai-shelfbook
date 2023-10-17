import { S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { promisify } from "util";

export const randomBytes = promisify(crypto.randomBytes);

const region = "ap-south-1";

export const bucketName = "ai-shelfbook";

const accessKeyId = process.env.AWS_IMAGES_USER_ACCESS_ID;
const secretAccessKey = process.env.AWS_IMAGES_USER_SECRET_ACCESS_KEY;

export const s3 = new S3Client({
	region,
	apiVersion: "v4",
	credentials: {
		accessKeyId: accessKeyId!,
		secretAccessKey: secretAccessKey!,
	},
});
