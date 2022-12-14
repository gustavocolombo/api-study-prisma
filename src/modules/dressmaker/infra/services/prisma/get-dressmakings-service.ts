import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';
import {
  IGetDressmakingDTO,
  IReturnDressmakingDTO,
} from '../../../dtos/IGetDressmakingsDTO';

@Injectable()
export class GetDressmakingsService {
  constructor(private prismaService: PrismaService) {}

  async execute({ id }: IGetDressmakingDTO): Promise<IReturnDressmakingDTO[]> {
    const dressmakings = await this.prismaService.dressmaker.findFirst({
      where: { id },
      select: {
        dressmaking: {
          select: {
            id: true,
            name_service: true,
            grabbed: true,
            price: true,
            start_date: true,
            end_date: true,
            dressmaker: {
              select: {
                id: true,
                email: true,
                status: true,
              },
            },
            user: {
              select: {
                id: true,
                email: true,
                status: true,
              },
            },
          },
        },
      },
    });

    return dressmakings.dressmaking;
  }
}
