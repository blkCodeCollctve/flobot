# Flobot ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)

Flobot is a [Slack app](https://get.slack.help/hc/en-us/articles/202035138-Add-an-app-to-your-workspace) that retrieves [Typeform responses](https://developer.typeform.com/responses/reference/retrieve-responses/) and posts them to Slack using a given webhook. Flobot is configured to be hosted in [Heroku](https://www.heroku.com/) and run as a standalone worker that is scheduled via [Heroku's Scheduler](https://devcenter.heroku.com/articles/scheduler).

## Installation

### Requirements
* npm
* node v8.9.4+
* heroku v7.18.3+
* environment variables:
    * `SLACK_FLOBOT_WEBHOOK` - the Slack webhook URL
    * `TYPEFORM_KEY` - the Typeform Person Token
* [constants](constants):
    * `TYPEFORM_ID` - the ID of the Typeform


### Steps
* Run `npm install`

## Usage
Once these changes have been deployed to Heroku the `TYPEFORM_RESPONSES_URL` in [constants.js](constants) will be called and the responses will be posted via the `SLACK_FLOBOT_WEBHOOK`.

If the environment variables are created locally, this code can also be run locally by running `npm start`.

**NOTE:** Changes to this code should not be verified via `npm start` as your local environment operates differently than [Heroku's Ephemeral filesystem](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem).

## Development
To make changes to this PR, adhere to the following process:

1. Fork this repository.
 * Pull the latest if you've previously forked this repo.
* Create a feature branch.
* Push your branch and create a PR.
 * Once your PR is merged it will be deployed to Heroku.

**NOTE:** Making changes to this repo requires admin access to Black Code Collective's Slack team, Typeform, and collaborator access to the Flobot Heroku app.

## Contributing
Pull Requests are welcome but please open an issue before submitting a PR. In addition please be sure to update tests and this README as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
