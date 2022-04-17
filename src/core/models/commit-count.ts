export class CommitCount {
  constructor(
    public id: number,
    public number: number,
    public title: string,
    public author: string,
    public commit_count: number,
  ) { }
}
