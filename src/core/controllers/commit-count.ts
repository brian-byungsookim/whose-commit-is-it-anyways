import { NextFunction, Request, Response } from "express";
import { APIError, CommitCount, GitHubCommitResponse, GitHubLink, GitHubLinkType, GitHubPullRequest, HttpHeaders } from "../models";
import { listCommitsOnPullRequest, listCommitsOnPullRequestWithUrl, listPullRequests, listPullRequestsWithUrl } from "../services";

export async function listCommitCounts(req: Request, res: Response, next: NextFunction) {
  const { owner, repo } = req.query;

  if (req.headers.authorization) {
    console.log("Using Basic Auth...");
  } else {
    console.log("Sending unauthenticated requests. Beware of rate limits!");
  }

  const opts = {
    params: {
      "per_page": 100,
      "authorization": req.headers.authorization
    }
  };

  const pullRequests: GitHubPullRequest[] = [];

  try {
    let { data, headers, status } = await listPullRequests(owner as string, repo as string, opts);
    pullRequests.push(...data);
    console.log(`[${status}]: Found ${data.length} pull requests`);
    // GitHub encourages using values within the Link HTTP header (see: https://docs.github.com/en/rest/overview/resources-in-the-rest-api#link-header)
    let nextPage = getNextPage(headers);
    
    while (nextPage) {
      let { data, headers, status } = await listPullRequestsWithUrl(nextPage.link, opts);
      pullRequests.push(...data);
      console.log(`[${status}]: Found ${data.length} more pull requests`);
      nextPage = getNextPage(headers);
    }
  } catch (err: any) {
    next(new APIError(
      "GENERAL",
      `Error fetching pull requests: ${err.message}`,
      400
    ));

    return;
  }
  
  let commitCounts: CommitCount[] = [];

  try {
    for (let pullRequest of pullRequests) {
      let commits: GitHubCommitResponse[] = [];
      let { data, headers, status } = await listCommitsOnPullRequest(owner as string, repo as string, pullRequest.number, opts);
      commits.push(...data);
      console.log(`[${status}]: Found ${data.length} commits`);
      // GitHub encourages using values within the Link HTTP header (see: https://docs.github.com/en/rest/overview/resources-in-the-rest-api#link-header)
      let nextPage = getNextPage(headers);
      
      while (nextPage) {
        let { data, headers, status } = await listCommitsOnPullRequestWithUrl(nextPage.link, opts);
        commits.push(...data);
        console.log(`[${status}]: Found ${data.length} more commits`);
        nextPage = getNextPage(headers);
      }

      commitCounts.push(buildCommitCount(pullRequest, commits));
    }
  } catch (err: any) {
    next(new APIError(
      "GENERAL",
      `Error fetching commits: ${err.message}`,
      400
    ));
  }

  res.status(200).json(commitCounts);
};


/**
 * Parses `link` HTTP header return from GitHub and determines what (if at all) the URL of
 *   the next page is.
 * 
 * Example header: 
 * `<https://api.github.com/repositories/94911145/pulls?per_page=10&page=2>; rel="next", <https://api.github.com/repositories/94911145/pulls?per_page=10&page=4>; rel="last"`
 **/
function getNextPage(headers: HttpHeaders): GitHubLink | undefined {
  if (headers.link && typeof headers.link === "string") {
    const links = headers.link.split(",");

    for (let link of links) {
      let [ rawUrl, rawRel ] = link.split(";");
      // remove leading and trailing '<', '>'
      let url = rawUrl.trim().slice(1, -1);
      // find what's between the quotes
      let rel = rawRel.trim().match(/(?<=\")(.*)(?=\")/g);

      if (rel && rel[0] === "next") {
        return new GitHubLink(url, rel[0] as GitHubLinkType);
      }
    }
  }
}

function buildCommitCount(
  pullRequest: GitHubPullRequest,
  commits: GitHubCommitResponse[]
): CommitCount {
  return new CommitCount(
    pullRequest.id,
    pullRequest.number,
    pullRequest.title,
    commits[0].commit.author.name,
    commits.length
  );
}
