import { BasicAuthCredentials, GitHubCommitResponse, GitHubPullRequest, HttpResponse } from "../models";
import { HttpClient } from "../utils";


export async function listPullRequests(
  owner: string,
  repo: string,
  opts?: { auth?: BasicAuthCredentials }
): Promise<HttpResponse<GitHubPullRequest[]>> {
  const http = HttpClient.getInstance();

  return http.get<GitHubPullRequest[]>(
    `https://api.github.com/repos/${owner}/${repo}/pulls`,
    { auth: opts?.auth }
  );
}

export async function listCommitsOnPullRequest(
  owner: string,
  repo: string,
  pullNumber: number,
  opts?: { auth?: BasicAuthCredentials }
): Promise<HttpResponse<GitHubCommitResponse[]>> {
  const http = HttpClient.getInstance();

  return http.get<GitHubCommitResponse[]>(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/commits`,
    { auth: opts?.auth }
  );
}
