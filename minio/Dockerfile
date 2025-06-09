FROM minio/minio:latest

EXPOSE 9000 9090

VOLUME ["/data"]

ENV MINIO_ROOT_USER=minioadmin \
    MINIO_ROOT_PASSWORD=minioadmin \
    MINIO_BROWSER=on

CMD ["server", "--console-address", ":9090", "/data"]