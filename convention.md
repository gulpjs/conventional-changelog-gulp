Make the changes to the code and tests and then commit to your branch. Be sure to follow the commit message conventions.

Commit message summaries must follow this basic format:

```
Tag: Message (fixes #1234)
```

`Tag` should not be confused with git tag.
`Message` should not be confused with git commit message.

The `Tag` is one of the following (sorted in order below):

* `Breaking` - implements a backwards-incompatible change.
* `Fix` - implements a bug fix.
* `New` - implements a new feature.
* `Update` - implements a backwards-compatible enhancement.
* `Docs` - changes to documentation only.
* `Upgrade` - upgrades dependencies.
* `Build` - changes to build process only.
* `Scaffold` - changes to project structure.

The message summary should be a one-sentence description of the change. The issue number should be mentioned at the end. * The commit message should say "(fixes #1234)" or "(closes #1234)" at the end of the description if it closes out an existing issue (replace 1234 with the issue number). If the commit doesn't completely fix the issue, then use `(refs #1234)` instead of `(fixes #1234)`. Multiple issues can be referenced as "(fixes #1234, ref #1235)".

Here are some good commit message summary examples:

```
Docs: Fix mistake in usage section
Scaffold: Consistency with other repos (closes #15, closes #16)
Upgrade: Update end-of-stream/lab/rx/through2/when & switch to new lab API
Update: Convert tests from tap to lab (closes #12)
```

The commit message format is important because these messages are used to create a changelog for each release. The tag and issue number help to create more consistent and useful changelogs.
