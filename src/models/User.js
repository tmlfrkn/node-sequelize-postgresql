import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";
import { Student } from "./Student.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    permission: {
      type: DataTypes.STRING,
      defaultValue: null
    },
  },
  {
    timestamps: true,
  }
);

Student.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id"
})