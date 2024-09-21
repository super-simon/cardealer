import { CommandFactory } from 'nest-commander';
import { CmdModule } from './modules/cmd/cmd.module';

async function bootstrap() {
  await CommandFactory.run(CmdModule);
}

bootstrap();
