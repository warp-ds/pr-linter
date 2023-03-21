import core from '@actions/core'
import { context } from '@actions/github'

const prRegex = new RegExp('^(chore|docs|feat|fix|perf|refactor|style|test|build|revert)((.+))?:(.+)');
const branchesToIgnore = [
  'main',
  'master'
]

async function go() {
  try {
    if (context.eventName !== 'pull_request' || branchesToIgnore.find(b => b === context.payload.pull_request.base.ref)) return
    const title = context.payload.pull_request.title
    const passes = !!prRegex.test(title)
    if (!passes) core.setFailed(`PR title '${title}' does not meet commit message requirements. More info: https://www.conventionalcommits.org/en/v1.0.0/#summary`)
  } catch (err) {
    core.debug(err)
    core.setFailed(err)
  }
}

await go()
