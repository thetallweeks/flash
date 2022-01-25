interface CardMetadata {
  reviewCount?: number;
  successCount?: number;
  failCount?: number;
}

export interface Card {
  id?: string;
  term: string;
  definition: string;
  metadata?: CardMetadata;
}

export interface Cards extends Array<Card>{}

export interface Deck {
  id?: string;
  name: string;
  cards: Cards;
}

export interface Decks extends Array<Deck> {}
