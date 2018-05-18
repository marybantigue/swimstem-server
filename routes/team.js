const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  createTeam,
  getTeam,
  deleteTeam,
  listTeams
} = require('../handlers/teams');

console.log('inside routes');


// prefix - /api/teams
router.route("/")
  .post(createTeam)
  .get(listTeams);



// prefix - /api/teams/:id/messages/:message_id
router
  .route("/:id")
  .get(getTeam)
  .delete(deleteTeam);

module.exports = router;
