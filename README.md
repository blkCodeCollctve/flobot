# Flobot ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)

Flobot is a [Slack app](https://get.slack.help/hc/en-us/articles/202035138-Add-an-app-to-your-workspace) that retrieves [Typeform responses](https://developer.typeform.com/responses/reference/retrieve-responses/) and posts them to Slack using a given webhook. Flobot is configured to be hosted in [Heroku](https://www.heroku.com/) and run as a standalone worker that is scheduled via [Heroku's Scheduler](https://devcenter.heroku.com/articles/scheduler). An [mLab](https://mlab.com/) database is being used to save the last time the worker is run to ensure only new Typeform responses are retrieved.

## Installation

### Requirements
* npm
* node v8.9.4+
* heroku v7.18.3+


### Steps
* Run `npm install`, this will create a lock file.

## Usage
Once these changes have been deployed the `TYPEFORM_RESPONSES_URL` in [constants.js](src/constants.js) will be called and the responses will be posted via the `SLACK_FLOBOT_WEBHOOK`.

If the environment variables are created locally, this code can also be run with `npm start`.

### Environment Variables
  * `DB_URI` - database URI
  * `DB_NAME` - database name
  * `DB_USER` - database user
  * `DB_PASSWORD` - database user password
  * `SLACK_FLOBOT_WEBHOOK` - the Slack webhook URL
  * `SLACK_FLOBOT_WEBHOOK_TEST` - the Slack webhook URL for testing (optional)
  * `TYPEFORM_KEY` - the Typeform Person Token
  * `TYPEFORM_ID` - the ID of the Typeform


## Development
To make changes to this PR, adhere to the following process:

1. Fork this repository.
    - Pull the latest if you've previously forked this repo.
2. Create a feature branch.
3. Push your branch and create a PR.
    - Once your PR is merged it will be deployed to Heroku.

**NOTE:** Making changes to this repo requires admin access to Black Code Collective's Slack team, Typeform, mLab database, and collaborator access to the Flobot Heroku app.

Also, `npm start` should not be used to verify code changes as local environments operate differently than [Heroku's](https://devcenter.heroku.com/articles/dynos).

## Contributing
Pull Requests are welcome but please open an issue before submitting a PR. In addition please be sure to update tests and this README as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
