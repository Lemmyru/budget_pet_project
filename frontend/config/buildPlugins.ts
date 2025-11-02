import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildPlugins({ mode, paths }: BuildOptions): Configuration['plugins'] {
    const isDev: boolean = mode === 'development';
    const isProd: boolean = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: paths.html }),
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())
    }
    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))
    }

    return plugins;
}