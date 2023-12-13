const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
	mode: "development",
	entry: "./src/app/index.tsx",
	plugins: [
		new HTMLWebpackPlugin({
			template: "./src/app/index.html",
		}),
		new SourceMapDevToolPlugin({
			filename: "[file].map",
		}),
	],
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@features": path.resolve(__dirname, "src/features"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@shared": path.resolve(__dirname, "src/shared"),
			"@widgets": path.resolve(__dirname, "src/widgets"),
			"@entities": path.resolve(__dirname, "src/entities"),
		},
		extensions: [".ts", ".tsx", ".js","sass"],
	},
	output: {
		filename: "[name].[hash].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.(s(a|c))ss$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName: "[local]__[hash:base64:5]",
								auto: true
							},
						},
					},
					{
						loader: "sass-loader",   
					}
 
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i, 
				loader: "file-loader",
				options: {
					name: "/public/icons/[name].[ext]"
				}
			}
		]
	},
	devServer: {
		open: [ "/tasks"],
		historyApiFallback: true,
		hot: true, 
	},
};