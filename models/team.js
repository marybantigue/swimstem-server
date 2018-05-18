const mongoose = require("mongoose");
const User = require("./user");

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true
    },
    shortName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true
    },
    coaches: {
      type: Array
    },
    headCoach: {
      type: String,
      required: true
    }

  },
  {
    timestamps: true
  }
);

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
