import { DataTypes, Sequelize } from "sequelize";
import ConfigDb from "../config/configDb.js";

const dailyfitinfo = ConfigDb.define("dailyfitinfo", {
  Zone1Time: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Zone2Time: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Zone3Time: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Zone4Time: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Zone5Time: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  DateRecorded: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  resting_heart: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  userid: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "UserId",
    },
  },
  share: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
});

export default dailyfitinfo;
