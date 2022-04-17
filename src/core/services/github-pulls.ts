import { BasicAuthCredentials, GitHubCommitResponse, GitHubPullRequest, HttpResponse } from "../models";
import { HttpClient } from "../utils";


export async function listPullRequests(
  owner: string,
  repo: string,
  opts?: { auth?: BasicAuthCredentials, params?: any }
): Promise<HttpResponse<GitHubPullRequest[]>> {
  const http = HttpClient.getInstance();

  return http.get<GitHubPullRequest[]>(
    `https://api.github.com/repos/${owner}/${repo}/pulls`,
    opts
  );
}

export async function listPullRequestsWithUrl(
  url: string,
  opts?: { auth?: BasicAuthCredentials, params?: any }
): Promise<HttpResponse<GitHubPullRequest[]>> {
  const http = HttpClient.getInstance();

  return http.get<GitHubPullRequest[]>(url, opts);
}

export async function listCommitsOnPullRequest(
  owner: string,
  repo: string,
  pullNumber: number,
  opts?: { auth?: BasicAuthCredentials, params?: any }
): Promise<HttpResponse<GitHubCommitResponse[]>> {
  const http = HttpClient.getInstance();

  return http.get<GitHubCommitResponse[]>(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/commits`,
    opts
  );
}

export async function listCommitsOnPullRequestWithUrl(
  url: string,
  opts?: { auth?: BasicAuthCredentials, params?: any }
): Promise<HttpResponse<GitHubCommitResponse[]>> {
  const http = HttpClient.getInstance();

  return http.get<GitHubCommitResponse[]>(url, opts);
}
