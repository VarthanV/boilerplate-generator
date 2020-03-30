"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const constants_1 = require("./constants");
const spawnCommand = require("spawn-command");
const fs = require("fs");
const path = require("path");
function run(cmd, options) {
    return new Promise((accept, reject) => {
        let process = spawnCommand(cmd, options);
        process.stdout.on("data", () => {
            vscode.window.showInformationMessage("Your Project is being created");
        });
        process.stderr.on("data", (err) => {
            vscode.window.showInformationMessage(err);
        });
        process.on("exit", (status) => {
            if (status) {
                reject("Error");
            }
            else {
                accept();
            }
            vscode.window.showInformationMessage("Project Created Succesfully");
        });
    });
}
function activate(context) {
    const workspace = vscode.workspace;
    if (!workspace) {
        vscode.window.showErrorMessage("No workspace");
        return;
    }
    const frameWorksSupported = [
        "React JS",
        "Django",
        "Vue",
        "Flutter",
        "HTML",
        "Chrome Extension"
    ];
    let disposable = vscode.commands.registerCommand("extension.helloWorld", () => {
        let cwd = vscode.workspace.rootPath;
        const options = {};
        options.cwd = cwd;
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = frameWorksSupported.map((elem) => ({
            label: elem
        }));
        quickPick.onDidChangeSelection(([selection]) => __awaiter(this, void 0, void 0, function* () {
            if (selection) {
                const result = yield vscode.window.showInputBox({
                    value: "abcdef"
                });
                const readme = `## ${result}`;
                if (selection.label === "React JS") {
                    run(`npx create-react-app ${result}`, options);
                }
                else if (selection.label === "Django") {
                    run(`django-admin startproject ${result} && cd ${result} &&django-admin startapp ${result}_app`, options).then(() => {
                        fs.writeFile(path.join(cwd, result, "README.md"), readme, (err) => {
                            if (err) {
                                return vscode.window.showErrorMessage("Unexpected Error Occured");
                            }
                        });
                    });
                }
                else if (selection.label === "Flutter") {
                    run(`flutter create ${result}`, options);
                }
                else if (selection.label === "Vue") {
                    run(`vue create ${result}`, options);
                }
                else if (selection.label === "HTML") {
                    run(`mkdir ${result} && cd ${result}`, options)
                        .then(() => {
                        fs.writeFile(path.join(cwd, result, "index.html"), constants_1.htmlString, (err) => {
                            if (err) {
                                return vscode.window.showErrorMessage("Unexpected Error Occured !");
                            }
                        });
                    })
                        .then(() => {
                        fs.writeFile(path.join(cwd, result, "style.css"), constants_1.cssString, (err) => {
                            if (err) {
                                return vscode.window.showErrorMessage("Unexpected Error Code");
                            }
                        });
                    })
                        .then(() => {
                        fs.writeFile(path.join(cwd, result, "script.js"), constants_1.scriptString, (err) => {
                            if (err) {
                                return vscode.window.showErrorMessage("Unexpected Error Occured");
                            }
                        });
                    })
                        .then(() => {
                        fs.writeFile(path.join(cwd, result, "README.md"), readme, (err) => {
                            if (err) {
                                return vscode.window.showErrorMessage("Unexpected Error Occured");
                            }
                        });
                    });
                }
                else if (selection.label === "Chrome Extension") {
                    run(`mkdir ${result} && cd ${result}`, options)
                        .then(() => {
                        fs.writeFile(path.join(cwd, result, "popup.html"), constants_1.extensionHtml, (err) => {
                            if (err) {
                                return vscode.window.showErrorMessage("Unexpected Error Occured !");
                            }
                        });
                    })
                        .then(() => {
                        fs.writeFile(path.join(cwd, result, "popup.js"), constants_1.popupJS, (err) => {
                            if (err) {
                                return vscode.window.showErrorMessage("Unexpected Error Occured !");
                            }
                        });
                    })
                        .then(() => {
                        fs.writeFile(path.join(cwd, result, "README.md"), readme, (err) => {
                            if (err) {
                                return vscode.window.showErrorMessage("Unexpected Error Occured");
                            }
                        });
                    });
                }
            }
        }));
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map