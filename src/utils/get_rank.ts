export interface Rank {
    name: string;
    minPoints: number;
}

const RANKS: Rank[] = [
    { name: "Radiante", minPoints: 7500 },
    { name: "Imortal", minPoints: 5000 },
    { name: "Ascendente", minPoints: 3500 },
    { name: "Diamante", minPoints: 2000 },
    { name: "Platina", minPoints: 1000 },
    { name: "Ouro", minPoints: 500 },
    { name: "Prata", minPoints: 250 },
    { name: "Bronze", minPoints: 100 },
    { name: "Ferro", minPoints: 0 },
];

export function getRankName(points: number): string {
    const rank = RANKS.find((rank) => points >= rank.minPoints);
    return rank?.name ?? "Ferro";
}
