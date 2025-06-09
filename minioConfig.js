import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
});

const healthCheck = async () => {
    try {
        await minioClient.listBuckets();
        console.log('✅ MinIO client connected successfully');
    } catch (error) {
        console.error('❌ MinIO connection error:', error);
        throw error;
    }
}

const checkBucket = async () => {
    await healthCheck();

    // Bucket initialization
    const exist = await minioClient.bucketExists('images');
    if (!exist) {
        await minioClient.makeBucket('images');
        await minioClient.setBucketPolicy('images', JSON.stringify({
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": "",
                    "Action": ["s3:GetObject"],
                    "Resource": ["arn:aws:s3:::"]
                }
            ]
        }))
    }
}

const getImageUrl = (objectName) => {
    objectName = objectName.replace(/_/g, '/');
    return `http://${process.env.URL_BASE}:${process.env.MINIO_PORT}/${objectName}.png`;
}

const uploadImage = async (file, bucketName) => {

    const objectName = `${crypto.randomUUID()}`;

    await minioClient.putObject(
        bucketName,
        `${ objectName }.png`,
        file.buffer,
        file.size,
        {
            'Content-Type': file.mimetype,
        },
    );

    return getImageUrl(objectName);

}

export {
    minioClient,
    healthCheck,
    checkBucket,
    getImageUrl,
    uploadImage
};