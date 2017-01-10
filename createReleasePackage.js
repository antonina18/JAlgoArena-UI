var archiver = require("archiver");
var fs = require("fs");
var version = "1.0.13";

if (process.env.TRAVIS_BUILD_NUMBER) {
    version = `${version}.${process.env.TRAVIS_BUILD_NUMBER}`;
}

var path = `${__dirname}/dist/JAlgoArena-UI-${version}.zip`;
console.log(`Creating package at: ${path}`);
var output = fs.createWriteStream(path);
var archive = new archiver("zip", { store: true });

output.on("close", function() {
    console.log(`${archive.pointer()} total bytes`);
    console.log("archiver has been finalized and the output file descriptor has closed.");
});

archive.on("error", function(err) {
    throw err;
});

archive.pipe(output);

archive.directory("./public", { name: "public"});
archive.directory("./node_modules", { name: "node_modules"});
archive.directory("./server", { name: "server"});
archive.directory("./client", { name: "client"});
archive.directory("./assets", { name: "assets"});
archive.file("assets/index.prod.html", { name: "public/assets/index.html" });
archive.file("assets/app.css", { name: "public/assets/app.css" });
archive.file("assets/favicon.ico", { name: "public/assets/favicon.ico" });
archive.file("assets/img/logo.png", { name: "public/assets/img/logo.png" });
archive.file("assets/img/profile.png", { name: "public/assets/img/profile.png" });
archive.file("./package.json");
archive.file("./README.md");
archive.file("./LICENSE");
archive.file("./.babelrc");
archive.file("./server.js");
archive.file("./webpack.config.prod.js");
archive.file("./webpack.config.dev.js");
archive.file("./createReleasePackage.js");
archive.file("./deletePublicDir.js");

archive.finalize();