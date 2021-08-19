import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailsService {
    constructor(
        @InjectQueue('emails')
        private readonly emailsQueue: Queue
    ) {}


    async transcode() {
        await this.emailsQueue.add('transcode', {
            file: 'audio.mp3',
        });
    }
}
