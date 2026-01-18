const { GITHUB_EVENTS } = require("./constants.cjs");
/**
 * GIthub event user
 *
 * @typedef {Object} GitHubEventUser
 * @property {number} id
 * @property {string} login
 * @property {string} [display_login]
 * @property {string} gravatar_id
 * @property {string} url
 * @property {string} avatar_url
 */

/**
 * Github event repo
 *
 * @typedef {Object} GitHubEventRepo
 * @property {number} id
 * @property {string} name
 * @property {string} url
 */

/**
 * Github event payload
 *
 * @typedef {Object} GitHubEventPayload
 * @property {string} ref
 * @property {string} ref_type
 * @property {string} full_ref
 * @property {string} master_branch
 * @property {string} description
 * @property {string} pusher_type
 *
 */

/**
 * Github event response
 *
 * @typedef {Object} GithubEvent
 * @property {number} id
 * @property {string} type
 * @property {GitHubEventUser} actor
 * @property {GitHubEventRepo} repo
 * @property {GitHubEventPayload} payload
 * @property {boolean} public
 * @property {string} created_at
 * @property {GitHubEventUser} [org]
 */

/**
 * Parse Github events api data and print events to console
 *
 * @param {Array<GithubEvent>} data
 */
const printGitHubActivity = (data) => {
  // For each event type, print event activity
  data.forEach((event) => {
    const eventDate = new Date(event.created_at).toUTCString();
    const eventRepoName = event.repo.name.split("/")[1];

    // Handle each event type
    switch (event.type) {
      case GITHUB_EVENTS.create:
        console.log(
          `- Created a new ${event.public ? "public" : "private"} repo '${eventRepoName}' on ${eventDate}`,
        );
        break;
      case GITHUB_EVENTS.push:
        console.log(`- Pushed to repo '${eventRepoName}' on ${eventDate}`);
        break;
      case GITHUB_EVENTS.watch:
        console.log(
          `- '${event.org.login}' launched a release on ${eventDate}`,
        );
        break;
      default:
        console.log(event);
    }
  });
};

module.exports = printGitHubActivity;
