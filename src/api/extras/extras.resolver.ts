import { Resolver, Query } from '@nestjs/graphql';
import { ExtrasService } from './extras.service';
import { ExtraType } from './extras.type';

@Resolver()
export class ExtrasResolver {
  constructor(private readonly extrasService: ExtrasService) {}

  @Query(() => [ExtraType])
  async extras(): Promise<ExtraType[]> {
    return this.extrasService.getExtras();
  }
}