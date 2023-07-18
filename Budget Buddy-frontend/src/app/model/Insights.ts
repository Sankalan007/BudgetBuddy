import InsightsCategories from "./InsightsCategories";

export default interface Insights{
    leastEarnDay: number;
    leastEarnMonth: number;
    leastEarnCategory: InsightsCategories;
    leastSpendDay: number;
    leastSpendMonth: number;
    leastSpendCategory: InsightsCategories;
    mostEarnDay: number;
    mostEarnMonth: number;
    mostEarnCategory: InsightsCategories;
    mostSpendDay: number;
    mostSpendMonth: number;
    mostSpendCategory: InsightsCategories;
}