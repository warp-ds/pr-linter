import * as github from '@actions/github'
import * as core from '@actions/core'
import go from '..'


const errorMessage = (title) => `PR title '${title}' does not meet commit message requirements. More info: https://www.conventionalcommits.org/en/v1.0.0/#summary`;

describe('pr title linter', () => {

  it('does not fail when valid PR title without scope', async () => {
    github.context = {
      eventName: 'pull_request',
      payload: {
        "pull_request": {
          "base": {
            "ref": "alpha"
          },
          "title": "fix: Valid title"
        }
      }
    }
    const res = await go();
    expect(res).toEqual(undefined)
  });

  it('does not fail when valid PR title without scope', async () => {
    github.context = {
      eventName: 'pull_request',
      payload: {
        "pull_request": {
          "base": {
            "ref": "alpha"
          },
          "title": "fix(scope): Valid title"
        }
      }
    }
    const res = await go();
    expect(res).toEqual(undefined)
  });


  it('should return undefined if not valid branch', async () => {
    github.context = {
      eventName: 'pull_request',
      payload: {
        "pull_request": {
          "base": {
            "ref": "main"
          },
          "title": "fix: Valid title"
        }
      }
    }
    const res = await go();
    expect(res).toEqual(undefined)
  });
  it('should fail when invalid PR title', async () => {
    const setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation(jest.fn())
  
    const title = "hej: Not valid title";
    github.context = {
      eventName: 'pull_request',
      payload: {
        "pull_request": {
          "base": {
            "ref": "alpha"
          },
          title 
        }
      }
    }  
    await go();
    expect(setFailedMock).toHaveBeenCalledWith(errorMessage(title))
  })
})
