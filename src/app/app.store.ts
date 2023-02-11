import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PlayerPoints {
  player: string;
  points: any;
}

@Injectable({ providedIn: 'root' })
export class AppStore {
  private readonly _players = new BehaviorSubject<string[]>([]);

  private readonly _points = new BehaviorSubject<Array<number[]>>([]);

  private readonly _factor = new BehaviorSubject<number>(1);

  constructor() {}

  get players$(): Observable<string[]> {
    return this._players.asObservable();
  }

  get points$(): Observable<Array<number[]>> {
    return this._points.asObservable();
  }

  get factor$(): Observable<number> {
    return this._factor.asObservable();
  }

  get players(): string[] {
    return this._players.getValue();
  }

  get points(): Array<number[]> {
    return this._points.getValue();
  }

  get factor(): number {
    return this._factor.getValue();
  }

  set players(values: string[]) {
    this._players.next(values);
  }

  set points(values: Array<number[]>) {
    this._points.next(values);
  }

  set factor(value: number) {
    this._factor.next(value);
  }

  addUniquePlayers(values: string[]): void {
    for (let value of values) {
      if (this.players.indexOf(value) === -1) {
        this.players = [...this.players, value];
      }
    }
  }

  addToPoints(values: number[]): void {
    this.points = [...this.points, [...values]];
  }
}
