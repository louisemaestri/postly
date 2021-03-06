import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('emails')
export class EmailsProcessor {
  private readonly logger = new Logger(EmailsProcessor.name);

  @Process('transcode')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}