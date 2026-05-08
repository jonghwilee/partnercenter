import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [
        react(),
        {
            name: "spa-fallback",
            configureServer: function (server) {
                var fallback = function (req, _res, next) {
                    var _a, _b;
                    var url = (_b = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("?")[0]) !== null && _b !== void 0 ? _b : "";
                    if ((url === "/admin" || url.startsWith("/admin/")) &&
                        !url.includes(".") &&
                        !url.startsWith("/@") &&
                        !url.startsWith("/node_modules")) {
                        req.url = "/";
                    }
                    next();
                };
                server.middlewares.stack.unshift({ route: "", handle: fallback });
            },
        },
    ],
    appType: "spa",
});
