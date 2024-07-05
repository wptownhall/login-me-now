const FileManagerPlugin = require( 'filemanager-webpack-plugin' );
const normalizePath = require( 'normalize-path' );
const Utils = require( './utils' );
const path = require( 'path' );

const pluginRootFile = Utils.pluginRootFile;
const rootDir = path.dirname( __dirname );
const dist = normalizePath( path.join( rootDir, '__build' ) );

module.exports = async () => {
	const version = ( await Utils.getPluginInfo() )?.version;
	const zipName = version
		? `${ pluginRootFile }-${ version }`
		: pluginRootFile;

	const transformBuildPaths = ( path ) => {
		if ( Array.isArray( path ) && path.length === 2 ) {
			return {
				source: path[ 0 ],
				destination: `${ dist }/zip/${ pluginRootFile }/${ path[ 1 ] }`,
			};
		}

		return {
			source: path,
			destination: `${ dist }/zip/${ pluginRootFile }/${ path }`,
		};
	};

	const buildFiles = [
		'app',
		'assets',
		'languages',
		'public',
		'templates',
		'vendor',
		'dynamic-utils.config.php',
		`${ pluginRootFile }.php`,
	].map( transformBuildPaths );

	const buildIgnoreFiles = [
		'**/Gruntfile.js',
		'**/.gitignore',
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
		'tests',
		'tailwind.config.js',
		'node_modules',
		'**/node_modules',

	].map( ( path ) => `${ dist }/zip/${ pluginRootFile }/${ path }` );

	return {
		entry: {},
		mode: 'production',
		plugins: [
			new FileManagerPlugin( {
				events: {
					onEnd: [
						{ 
							delete: [ dist ] 
						},
						{ 
							copy: buildFiles 
						},
						{
						  	delete: [`${dist}/zip/${pluginRootFile}/src`], 
						},
						{ 
							delete: buildIgnoreFiles 
						},
						{
							archive: [
								{
									source: `${ dist }/zip`,
									destination: `${ dist }/${ zipName }.zip`,
									options: {
										zlib: { level: 9 }, // Use maximum compression level
									},
								},
							],
						},
						{
							move: [
								{
									source: `${ dist }/zip/${ pluginRootFile }`,
									destination: `${ dist }/${ pluginRootFile }`,
								},
							],
						},
						{
							delete: [
								path.join( __dirname, 'dist' ),
								`${ dist }/zip`,
							],
						},
					],
				},
			} ),
		],
	};
};
