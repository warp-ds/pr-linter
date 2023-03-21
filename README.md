# pr-linter

Checks PRs for sanity against conventional commit standards

# Releasing

```sh
# Create a new branch
git checkout -b v1

# Run build
pnpm run build

# Add `dist` folder and commit
git add . && git commit -m "v1"

# Push the `v1` branch to Github
git push origin releases/v1

# Create a tag for the release and push it
git tag -fa v1 -m "v1"
git push origin v1
```

The later part can be done directly from https://github.com/warp-ds/pr-linter/releases/new


Sometimes you want to push changes to an existing tagged release. This is convenient because it doesn’t require changes to workflows that use your action.

```
# Checkout the release branch
git checkout v1

# Get this branch even with master so the latest changes are included
git reset --hard master

# Run build 
npm run build

# Add the dist and commit
git add . && git commit -m "v1"

# Force push to overwrite any previous commits for this branch
git push -f origin v1

# Remove previously pushed tag
git push origin :refs/tags/v1.0.0 (or any tag you want to update)

# Re-apply the tag
git tag -fa v1.0.0 -m "v1"

# Push everything
git push origin v1.0.0

```

# Suggestion on the testing

To test the plugin you can run `act`. [More info here](https://github.com/nektos/act).

Be aware that `act` depends on `docker` to run workflows. So in order to run the test
`act` and `docker` need to be installed and run in your local env. In the link shared above you can 
find all information needed for a successfull installation.

Create a test.json. File can be stored wherever, just update the path to the file when running the command. 
Provide the data that you want to test, e.g.

```
{
    "pull_request": {
      "base": {
        "ref": "alpha"
      },
      "title": "notValid: Valid title"
    }
}
```

and run the following scripts :point_down

```shell
pnpm run build
act pull_request -e test.json
```
You'll also need to add a checkout step(`- uses: actions/checkout@v3`) in the action to make the action work in `act`, in `main.yml` 

If you run into some troubles running `act` you can visit [this page](https://github.com/nektos/act#known-issues)

