import * as github from '@actions/github'
import * as core from '@actions/core'
import go from '..'
import * as validPR from './mock/valid_pr_title.json';
import * as notValidPR from './mock/not_valid_pr_title.json';
import * as notValidBranchPr from './mock/should_not_run.json';
import * as validPRwithScope from './mock/valid_pr_title_scope.json';


const errorMessage = (title) => `PR title '${title}' does not meet commit message requirements. More info: https://www.conventionalcommits.org/en/v1.0.0/#summary`;

const contextPR = (payload) => ({
  eventName: 'pull_request',
  payload
});

describe('pr title linter', () => {

  it('does not fail when valid PR title without scope', async () => {
    github.context = contextPR(validPR);

    const res = await go();
    expect(res).toEqual(undefined)
  });

  it('does not fail when valid PR title with scope', async () => {
    github.context = contextPR(validPRwithScope);

    const res = await go();
    expect(res).toEqual(undefined)
  });


  it('should return undefined if not valid branch', async () => {
    github.context = contextPR(notValidBranchPr);

    const res = await go();
    expect(res).toEqual(undefined)
  });
  it('should fail when invalid PR title', async () => {
    github.context = contextPR(notValidPR);

    const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation(jest.fn())

    await go();
    expect(setFailedMock).toHaveBeenCalledWith(errorMessage(notValidPR.pull_request.title))
  })
})
