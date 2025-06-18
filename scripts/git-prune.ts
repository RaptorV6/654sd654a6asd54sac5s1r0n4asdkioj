import { $ } from "bun";

await $`git fetch -p`;

const remoteBranches = (await $`git branch -r | awk '{print $1}'`.text())
  .split(/\r\n|\r|\n/)
  .filter(Boolean)
  .reduce((r, i) => `${r}${r ? "|" : ""}(${i})`, "");

const remoteBranchesRegExp = new RegExp(remoteBranches);

const originBranches = (await $`git branch -vv | grep origin`.text()).split(/\r\n|\r|\n/);

const filteredBranches = originBranches
  .filter((s) => !remoteBranchesRegExp.test(s))
  .map((i) => (i.match(/^\*|\s\s*(\S+)/) || [])[1])
  .filter(Boolean)
  .join(" ");

if (filteredBranches.length) {
  await $`echo ${filteredBranches} | xargs git branch -d`;
} else {
  await $`echo "No branches to remove."`;
}
