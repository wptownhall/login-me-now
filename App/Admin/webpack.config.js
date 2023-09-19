// Load the default @wordpress/scripts config object
const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Use the defaultConfig but replace the entry and output properties
module.exports = {
	...defaultConfig,
	entry: {
		'dashboard-app': path.resolve(
			__dirname,
			'Assets/src/DashboardApp.js'
		),
	},
	resolve: {
		alias: {
			...defaultConfig.resolve.alias,
			'@DashboardApp': path.resolve( __dirname, 'Assets/src/dashboard-app/' ),
			'@Admin': path.resolve( __dirname, 'Assets/src/' ),
			'@Utils': path.resolve( __dirname, 'Assets/src/utils/' ),
			'@Skeleton': path.resolve( __dirname, 'Assets/src/common/skeleton/' ),
			'@Common': path.resolve( __dirname, 'Assets/src/common/' ),
		},
	},
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'Assets/build' ),
	},
	plugins: [
		// ...defaultConfig.plugins,
		...defaultConfig.plugins.filter( function ( plugin ) {
			if ( plugin.constructor.name === 'LiveReloadPlugin' ) {
				return false;
			}
			return true;
		} ),
	],
};
