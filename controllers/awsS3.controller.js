
'use strict'

const AWS = require('aws-sdk')

// AWS.config.update(
//     {
//         accessKeyId: "",
//         secretAccessKey: "",
//         region: ""
//     }
// )
const uploadBucket = ''
const s3 = new AWS.S3()

// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 5000

const getPresignedUrl = async (fileName, type) => {
    const contentType = type === 'video'
        ? 'video/mp4'
        : (type === 'pdf'
            ? 'application/pdf' : 'image/jpeg'
        )
    return new Promise((resolve, reject) => {
        // Get signed URL from S3
        const s3Params = {
            Bucket: uploadBucket,
            Key: fileName,
            Expires: URL_EXPIRATION_SECONDS,
            ContentType: contentType,
            ACL: 'public-read'
        }
        s3.getSignedUrlPromise('putObject', s3Params, (err, url) => {
            if (err) {
                reject(err);
            } else {
                resolve(url);
            }
        })
    }
    )
}

const getUploadURL = async (req, res) => {
    try {
        // post req here to get array of filename
        // let result = ["dog.jpg", "cat.jpg"];
        const { fileNames, type } = req.body
        if (fileNames.length > 0) {
            const signedUrls = await Promise.all(fileNames.map(item => getPresignedUrl(item, type)));
            console.log(signedUrls)
            res.status(200).send(signedUrls);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// const getUploadURL = async function (req, res) {
//     try {
//         const { fileName } = req.params

//         // Get signed URL from S3
//         const s3Params = {
//             Bucket: uploadBucket,
//             Key: fileName,
//             Expires: URL_EXPIRATION_SECONDS,
//             ContentType: 'image/jpeg',
//             ACL: 'public-read'
//         }

//         const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

//         if (uploadURL) {
//             res.status(200).send(uploadURL);
//         } else {
//             res.status(400);
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error);
//     }
// }

module.exports = {
    getUploadURL
};