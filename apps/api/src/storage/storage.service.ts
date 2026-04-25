import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

@Injectable()
export class StorageService {
  private s3: S3Client
  private reportsBucket: string
  private uploadsBucket: string

  constructor(private config: ConfigService) {
    this.s3 = new S3Client({ region: config.getOrThrow('AWS_REGION') })
    this.reportsBucket = config.getOrThrow('S3_BUCKET_REPORTS')
    this.uploadsBucket = config.getOrThrow('S3_BUCKET_UPLOADS')
  }

  async putReport(key: string, body: Buffer, contentType: string) {
    await this.s3.send(
      new PutObjectCommand({ Bucket: this.reportsBucket, Key: key, Body: body, ContentType: contentType }),
    )
  }

  async getSignedReportUrl(key: string, expiresIn = 3600): Promise<string> {
    return getSignedUrl(
      this.s3,
      new GetObjectCommand({ Bucket: this.reportsBucket, Key: key }),
      { expiresIn },
    )
  }

  async putUpload(key: string, body: Buffer, contentType: string) {
    await this.s3.send(
      new PutObjectCommand({ Bucket: this.uploadsBucket, Key: key, Body: body, ContentType: contentType }),
    )
  }
}
