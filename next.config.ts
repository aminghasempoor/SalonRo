import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    turbopack: {
        rules: {
            "*.svg": {
                loaders: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            icon: true,
                        },
                    },
                ],
                as: "*.ts",
            },
        },
    },
};
export default withNextIntl(nextConfig);
