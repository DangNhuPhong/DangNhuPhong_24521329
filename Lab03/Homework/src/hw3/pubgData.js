export const INITIAL_DROPS = [
  {
    id: "vip",
    title: "PVS Finals VIP Pass",
    priceVnd: 550000,
    remainingStock: 5,
    delayMs: 18000,
    liveMs: 120000,
  },
  {
    id: "crate",
    title: "G-Coin Bonus Crate (Demo)",
    priceVnd: 99000,
    remainingStock: 3,
    delayMs: 8000,
    liveMs: 120000,
  },
  {
    id: "sold",
    title: "Limited Collector Crate (Demo)",
    priceVnd: 199000,
    remainingStock: 0,
    delayMs: 0,
    liveMs: 120000,
  },
];

export const SQUADS = [
  {
    squadId: "te",
    squadName: "The Expendables",
    wwcdCount: 5,
    placementPts: 60,
    killPts: 54,
  },
  {
    squadId: "ces",
    squadName: "Cerberus Esports",
    wwcdCount: 4,
    placementPts: 56,
    killPts: 51,
  },
  {
    squadId: "roy",
    squadName: "Roy Esports",
    wwcdCount: 3,
    placementPts: 49,
    killPts: 42,
  },
  {
    squadId: "agg",
    squadName: "AGG",
    wwcdCount: 2,
    placementPts: 45,
    killPts: 36,
  },
];

export const KILL_FEED = Array.from({ length: 1000 }, (_, index) => {
  const squad = SQUADS[index % SQUADS.length];

  return {
    id: `kill-${index + 1}`,
    squadId: squad.squadId,
    text: `${squad.squadName} - elimination ${index + 1}`,
  };
});

export const formatVnd = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
