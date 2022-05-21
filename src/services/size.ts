export interface IAdSize {
    name: string;
    width: number;
    height: number;
}

export const SIZES: IAdSize[] = [
    { name: 'IAB FullBanner (468x60)', width: 468, height: 60 },
    { name: 'IAB Skyscraper (120x600)', width: 120, height: 600 },
    { name: 'IAB Leaderboard (728x90)', width: 728, height: 90 },
    { name: 'IAB Button1 (120x90)', width: 120, height: 90 },
    { name: 'IAB Button2 (120x60)', width: 120, height: 60 },
    { name: 'IAB HalfBanner (234x60)', width: 234, height: 60 },
    { name: 'IAB MicroBar (88x31)', width: 88, height: 31 },
    { name: 'IAB SquareButton (125x125)', width: 125, height: 125 },
    { name: 'IAB VerticalBanner (120x240)', width: 120, height: 240 },
    { name: 'IAB Rectangle (180x150)*', width: 180, height: 150 },
    { name: 'IAB MediumRectangle (300x250)*', width: 300, height: 250 },
    { name: 'IAB LargeRectangle (336x280)', width: 336, height: 280 },
    { name: 'IAB VerticalRectangle (240x400)', width: 240, height: 400 },
    { name: 'IAB SquarePop-up (250x250)', width: 250, height: 250 },
    { name: 'IAB WideSkyscraper (160x600)*', width: 160, height: 600 },
    { name: 'IAB Pop-Under (720x300)', width: 720, height: 300 },
    { name: 'IAB 3:1 Rectangle (300x100)', width: 300, height: 100 },
];
