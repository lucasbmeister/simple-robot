import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRobotPart, IRobotSchematic, Robot } from './robot';

@Injectable()
export class RobotService {

  state$: BehaviorSubject<Robot> = new BehaviorSubject(new Robot());
  getState(): Observable<Robot> {
    return this.state$
  }

  addPart(part: IRobotPart) {
    this.state$.value.addPart(part)
    this.state$.next(this.state$.value)
  }

  build(schematic: IRobotSchematic) {
    this.state$.next(Robot.build(schematic))
  }
}
