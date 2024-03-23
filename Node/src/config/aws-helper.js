const dotenv = require('dotenv');
dotenv.config();

const AWS = require('aws-sdk');
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = "1";
AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET
})

const s3 = new AWS.S3();

module.exports = s3;