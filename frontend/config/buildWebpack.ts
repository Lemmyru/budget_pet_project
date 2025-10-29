import * as webpack from "webpack";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";
import { buildDevServer } from "./buildDevServer";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options;
    const isDev = mode === "development";

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildDevServer(options) : undefined,
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        output: {
            filename: '[name].js',
            clean: true,
            path: paths.output,
        },
        optimization: {
            runtimeChunk: 'single',
        },
        plugins: buildPlugins(options),
    };
}