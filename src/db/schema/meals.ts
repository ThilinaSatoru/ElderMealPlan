import { pgTable, varchar, integer, text } from "drizzle-orm/pg-core";

export const meals = pgTable("meals", {
    mealId: varchar("meal_id", { length: 10 }).primaryKey(),
    mealDetails: text("meal_details").notNull(),
    mealType: varchar("meal_type", { length: 20 }).notNull(),
    glycemicIndex: integer("glycemic_index").notNull(),
    calories: integer("calories").notNull(),
    carbohydrates: integer("carbohydrates").notNull(),
    protein: integer("protein").notNull(),
    fats: integer("fats").notNull(),
    fiber: integer("fiber").notNull(),
    galleCulturalSuitability: varchar("galle_cultural_suitability", { length: 10 }).notNull(),
    allergenInformation: text("allergen_information"),
    cookingMethod: text("cooking_method"),
    dietaryPreference: varchar("dietary_preference", { length: 20 }),
});
