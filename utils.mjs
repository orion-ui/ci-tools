export const repo = process.env.REPO ?? process.argv.find(x => /^--repo/.test(x))?.split('=')?.[1] ?? '';
export const branch = process.env.BRANCH ?? process.argv.find(x => /^--branch/.test(x))?.split('=')?.[1] ?? '';
export const sanitizedBranch = branch.replace(/\//g, '-');