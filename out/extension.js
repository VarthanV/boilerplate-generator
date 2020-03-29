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
const spawnCommand = require('spawn-command');
function run(cmd, options) {
    return new Promise((accept, reject) => {
        var opts = {};
        let process = spawnCommand(cmd, options);
        process.stdout.on('data', () => {
            vscode.window.showInformationMessage("Your Project is being created");
        });
        process.stderr.on('data', (err) => {
            vscode.window.showInformationMessage(err);
        });
        process.on('exit', () => {
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
    const frameWorksSupported = ['React JS', 'Django', 'Vue', 'Flutter', "HTML", "Chrome Extension"];
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "boilerplate-generator" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        let cwd = vscode.workspace.rootPath;
        const options = {};
        options.cwd = cwd;
        vscode.window.showInformationMessage('Hello Worlddd');
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = frameWorksSupported.map((elem) => ({ label: elem }));
        quickPick.onDidChangeSelection(([selection]) => __awaiter(this, void 0, void 0, function* () {
            if (selection) {
                vscode.window.showInformationMessage(selection.label);
                const result = yield vscode.window.showInputBox({
                    value: 'abcdef',
                    valueSelection: [2, 4],
                    placeHolder: 'For example: fedcba. But not: 123',
                });
                if (selection.label === "React JS") {
                    run(`npx create-react-app ${result}`, options);
                    console.log('hi');
                }
                else if (selection.label === "Django") {
                    run(`django-admin startproject ${result} && cd ${result} &&django-admin startapp ${result}_app`, options);
                }
                else if (selection.label === "Flutter") {
                    run(`flutter create ${result}`, options);
                }
                else if (selection.label === "Vue") {
                    run(`vue create ${result}`, options);
                }
            }
        }));
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map