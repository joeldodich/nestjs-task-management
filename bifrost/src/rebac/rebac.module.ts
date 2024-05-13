import { Module } from '@nestjs/common';
import { RebacService } from './rebac.service';

@Module({
    providers: [RebacService],
    exports: [RebacService],
})
export class RebacModule {}
