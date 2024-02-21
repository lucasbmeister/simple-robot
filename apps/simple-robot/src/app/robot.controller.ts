import { Body, Controller, Post, Sse } from '@nestjs/common';

import { Observable, map } from 'rxjs';
import { IRobotPart, IRobotSchematic } from './robot';
import { RobotService } from './robot.service';

@Controller({
  path: 'robot',
  version: '1',
})
export class RobotController {
  constructor(private readonly robotService: RobotService) { }

  @Sse('state')
  state(): Observable<MessageEvent> {
    return this.robotService.getState().pipe(
      map((robot) => ({ data: robot }) as MessageEvent)
    );
  }

  @Post('build')
  build(@Body() schematic: IRobotSchematic) {
    this.robotService.build(schematic)
  }

  @Post('parts/add')
  addPart(@Body() part: IRobotPart) {
    this.robotService.addPart(part)
  }
}
