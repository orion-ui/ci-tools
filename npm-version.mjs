/* eslint-disable no-console */
import https from 'https';
import { branch, repo, sanitizedBranch } from './utils.mjs';

function findNextVersion () {
	if (!branch.length) throw `Missing branch name`;

	https.get(
		`https://registry.npmjs.org/${repo}`,
		{},
		(resp) => {
			let data = '';

			resp
				.on('data', (chunk) => { data += chunk; })
				.on('end', () => {
					const result = JSON.parse(data);
					const latest = result['dist-tags']?.latest ?? '0.0.0';
					const currentBranch = result['dist-tags']?.[sanitizedBranch] ?? sanitizedBranch;

					if (currentBranch?.includes(`${latest}-${sanitizedBranch}`)) {
						const currentVersion = (/\d+$/.exec(currentBranch))?.[0];
						const nextVersion = currentBranch?.replace(/\d+$/, (+(currentVersion ?? 0) + 1).toString());
						console.log(nextVersion);
					} else {
						const nextVersion = `${latest}-${sanitizedBranch}.1`;
						console.log(nextVersion);
					}
				});
		});
}

findNextVersion();
