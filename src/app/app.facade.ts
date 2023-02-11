import { Injectable } from '@angular/core';
import { combineLatest, map, tap, Observable } from 'rxjs';
import { AppStore } from './app.store';
import { CsvService } from './csv.service';
import { XmlService } from './xml.service';

@Injectable()
export class AppFacade {
  constructor(
    private xmlService: XmlService,
    private csvService: CsvService,
    private appStore: AppStore
  ) {}

  get players$(): Observable<string[]> {
    return this.appStore.players$;
  }

  get points$(): Observable<Array<number[]>> {
    return this.appStore.points$;
  }

  get factor$(): Observable<number> {
    return this.appStore.factor$;
  }

  get data$(): Observable<any> {
    return combineLatest([
      this.appStore.players$,
      this.appStore.points$,
      this.appStore.factor$,
    ]).pipe(
      map(([players, points, factor]) => {
        return points.map((perRow) =>
          perRow.reduce((prev, curr, i) => {
            return {
              ...prev,
              [players[i]]: curr * factor,
            };
          }, {})
        );
      })
    );
  }

  set factor(value: number) {
    this.appStore.factor = value;
  }

  processFiles(files: File[]): void {
    for (let file of files) {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        const xml = event.target!.result as string;
        const playerPoints = this.xmlService.extractPointsPerPlayer(xml);

        const players = playerPoints.map((p) => p.player);
        this.appStore.addUniquePlayers(players);

        const points = playerPoints.map((p) => p.points);
        this.appStore.addToPoints(points);
      });
      reader.readAsText(file, 'UTF-8');
    }
  }

  downloadAsCsv(): void {
    const headers = this.appStore.players;
    const factor = this.appStore.factor;
    const values = this.appStore.points.map((perRow) =>
      perRow.map((p) => p * factor)
    );
    const csv = this.csvService.toCSV(headers, values);
    this.csvService.downloadCSV(csv);
  }
}
