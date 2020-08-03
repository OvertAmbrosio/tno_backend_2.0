import { Module } from '@nestjs/common';
import { AwsClientService } from './aws-client.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule],
  providers: [AwsClientService],
  exports: [AwsClientService],
})
export class AwsClientModule {}
