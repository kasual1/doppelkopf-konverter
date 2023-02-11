import { Injectable } from '@angular/core';
import { PlayerPoints } from './app.store';

@Injectable({
  providedIn: 'root',
})
export class XmlService {
  playerPoints!: PlayerPoints[];

  constructor() {}

  extractPointsPerPlayer(text: string): PlayerPoints[] {
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const players = [].slice.call(xml.querySelector('players')!.children);

    return players.map((player: any) => {
      return {
        player: player.textContent,
        points: player.getAttribute('points'),
      };
    });
  }
}
