import { Test, TestingModule } from '@nestjs/testing';
import { FilesGeneratorController } from './files-generator.controller';

describe('FilesGeneratorController', () => {
  let controller: FilesGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesGeneratorController],
    }).compile();

    controller = module.get<FilesGeneratorController>(FilesGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
