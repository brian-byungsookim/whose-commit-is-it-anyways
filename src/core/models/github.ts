export type GitHubLinkType = "next" | "prev" | "last" | "first";

export class GitHubPullRequest {
  constructor(
    public id: number,
    public number: number,
    public title: string
  ) { }
}

export class GitHubCommitResponse {
  constructor(
    public commit: GitHubCommit
  ) { }
}

export class GitHubCommit {
  constructor(
    public author: GitHubAuthor
  ) { }
}

export class GitHubAuthor {
  constructor(
    public name: string
  ) { }
}

export class GitHubLink {
  constructor(
    public link: string,
    public rel: GitHubLinkType
  ) { }
}
