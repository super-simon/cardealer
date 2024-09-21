import { Command, CommandRunner } from 'nest-commander';
import { SeedingService } from '../seeding/seeding.service';

@Command({ name: 'seed', description: 'Seed: admin, models.' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly seedingService: SeedingService) {
    super();
  }

  async run(passedParams: string[]): Promise<void> {
    for (const passedParam of passedParams) {
      switch (passedParam) {
        case 'admin':
          await this.seedSuperAdmin();
          break;
        case 'models':
          await this.createModels();
          break;
      }
    }
  }

  async seedSuperAdmin() {
    try {
      console.log('Checking and creating a Super User...');
      const created = await this.seedingService.createMainAdminIfThereAreNone();
      if (created) {
        console.log('The Super User has been successfully created.');
      } else {
        console.log('Not created. The Super User already exists.');
      }
    } catch (e) {
      console.log('Error!');
      console.log(e.message);
    }
  }

  async createModels() {
    try {
      await this.seedingService.createModelsAndBrands();
    } catch (e) {
      console.log('Error!');
      console.log(e.message);
    }
  }
}
