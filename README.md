# pr-linter

Checks PRs for sanity against conventional commit standards

# Testing

To test the plugin you will run `act`. [More info here](https://github.com/nektos/act).

Be also aware that `act` depends on `docker` to run workflows. So in order to run the test
`act` and `docker` need to be installed and run in your local env. In the link shared above you can 
find all information needed for a successfull installation.

```shell
pnpm run test
```

If you run into some troubles running `act` you can visit [this page](https://github.com/nektos/act#known-issues)

# Releasing

```sh
// Create a new branch
git checkout -b v1

// Run build
pnpm run build

// Add `dist` folder and commit
git add . && git commit -m "v1"

// Push the `v1` branch to Github
git push origin releases/v1

// Create a tag for the release and push it
git tag -fa v1 -m "v1"
git push origin v1
```

The later part can be done directly from https://github.com/warp-ds/pr-linter/releases/new
