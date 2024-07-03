const FileManagerPlugin = require( 'filemanager-webpack-plugin' );
const Utils = require( './utils' );

const pluginRootFile = Utils.pluginRootFile;
const dist = __dirname;

module.exports = async () => {
	const transformBuildPaths = ( path ) => {
		if ( Array.isArray( path ) && path.length === 2 ) {
			return {
				source: path[ 0 ],
				destination: `${ dist }/${ pluginRootFile }/${ path[ 1 ] }`,
			};
		}

		return {
			source: path,
			destination: `${ dist }/${ pluginRootFile }/${ path }`,
		};
	};

	const buildFiles = [
		'app',
		'assets',
		'assets-vendor',
		'languages',
		'templates',
		'vendor',
		'readme.txt',
		`${ pluginRootFile }.php`,
	].map( transformBuildPaths );

	const buildIgnoreFiles = [
		'**/Gruntfile.js',
		'**/.gitignore',
		'vendor/vendor-src/bin',
		'**/dev-*/**',
		'**/*-test/**',
		'**/*-beta/**',
		'**/scss/**',
		'**/sass/**',
		'**/.*',
		'**/build/*.txt',
		'**/*.map',
		'**/*.config',
		'**/*.config.js',
		'**/package.json',
		'**/package-lock.json',
		'**/tsconfig.json',
		'**/mix-manifest.json',
		'**/phpcs.xml',
		'**/composer.json',
		'**/composer.lock',
		'**/*.md',
		'**/*.mix.js',
		'**/none',
		'**/artisan',
		'**/phpcs-report.xml',
		'**/LICENSE',
		'**/Installable',
		'**/tests',
		'config.dev.php',
	].map( ( path ) => `${ dist }/${ pluginRootFile }/${ path }` );

	return {
		entry: {},
		mode: 'production',
		plugins: [
			new FileManagerPlugin( {
				events: {
					onEnd: [
						{ delete: [ `${ dist }/${ pluginRootFile }` ] },
						{ copy: buildFiles },
						{ delete: buildIgnoreFiles }
					]
				}
			} )
		]
	};
};
