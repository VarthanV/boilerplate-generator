import * as vscode from "vscode";
import {
  htmlString,
  cssString,
  scriptString,
  extensionHtml,
  popupJS
} from "./constants";
const spawnCommand = require("spawn-command");
const fs = require("fs");
const path = require("path");

function run(cmd: string, options: any) {
  return new Promise((accept, reject) => {
    let process = spawnCommand(cmd, options);

    process.stdout.on("data", () => {
      vscode.window.showInformationMessage("Your Project is being created");
    });
    process.stderr.on("data", (err: any) => {
      vscode.window.showInformationMessage(err);
    });
    process.on("exit", (status: any) => {
      if (status) {
        reject("Error");
      } else {
        accept();
      }
      vscode.window.showInformationMessage("Project Created Succesfully");
    });
  });
}
export function activate(context: vscode.ExtensionContext) {
  const workspace = vscode.workspace;
  if (!workspace) {
    vscode.window.showErrorMessage("No workspace");
    return;
  }

  const frameWorksSupported: string[] = [
    "React JS",
    "Django",
    "Vue",
    "Flutter",
    "HTML",
    "Chrome Extension"
  ];
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    () => {
      let cwd = vscode.workspace.rootPath;
      const options: any = {};
      options.cwd = cwd;


      const quickPick = vscode.window.createQuickPick();
      quickPick.items = frameWorksSupported.map((elem: string) => ({
        label: elem
      }));
      quickPick.onDidChangeSelection(async ([selection]: any) => {
        if (selection) {
          const result = await vscode.window.showInputBox({
            value: "abcdef"
          });
          const readme = `## ${result}`;
          if (selection.label === "React JS") {
            run(`npx create-react-app ${result}`, options);
        
          } else if (selection.label === "Django") {
            run(
              `django-admin startproject ${result} && cd ${result} &&django-admin startapp ${result}_app`,
              options
            ).then(() => {
              fs.writeFile(
                path.join(cwd, result, "README.md"),
                readme,
                (err: any) => {
                  if (err) {
                    return vscode.window.showErrorMessage(
                      "Unexpected Error Occured"
                    );
                  }
                }
              );
            });
          } else if (selection.label === "Flutter") {
            run(`flutter create ${result}`, options);
          } else if (selection.label === "Vue") {
            run(`vue create ${result}`, options);
          } else if (selection.label === "HTML") {
            run(`mkdir ${result} && cd ${result}`, options)
              .then(() => {
                fs.writeFile(
                  path.join(cwd, result, "index.html"),
                  htmlString,
                  (err: any) => {
                    if (err) {
                      return vscode.window.showErrorMessage(
                        "Unexpected Error Occured !"
                      );
                    }
                  }
                );
              })
              .then(() => {
                fs.writeFile(
                  path.join(cwd, result, "style.css"),
                  cssString,
                  (err: any) => {
                    if (err) {
                      return vscode.window.showErrorMessage(
                        "Unexpected Error Code"
                      );
                    }
                  }
                );
              })
              .then(() => {
                fs.writeFile(
                  path.join(cwd, result, "script.js"),
                  scriptString,
                  (err: any) => {
                    if (err) {
                      return vscode.window.showErrorMessage(
                        "Unexpected Error Occured"
                      );
                    }
                  }
                );
              })
              .then(() => {
                fs.writeFile(
                  path.join(cwd, result, "README.md"),
                  readme,
                  (err: any) => {
                    if (err) {
                      return vscode.window.showErrorMessage(
                        "Unexpected Error Occured"
                      );
                    }
                  }
                );
              });
          } else if (selection.label === "Chrome Extension") {
            run(`mkdir ${result} && cd ${result}`, options)
              .then(() => {
                fs.writeFile(
                  path.join(cwd, result, "popup.html"),
                  extensionHtml,
                  (err: any) => {
                    if (err) {
                      return vscode.window.showErrorMessage(
                        "Unexpected Error Occured !"
                      );
                    }
                  }
                );
              })
              .then(() => {
                fs.writeFile(
                  path.join(cwd, result, "popup.js"),
                  popupJS,
                  (err: any) => {
                    if (err) {
                      return vscode.window.showErrorMessage(
                        "Unexpected Error Occured !"
                      );
                    }
                  }
                );
              })
              .then(() => {
                fs.writeFile(
                  path.join(cwd, result, "README.md"),
                  readme,
                  (err: any) => {
                    if (err) {
                      return vscode.window.showErrorMessage(
                        "Unexpected Error Occured"
                      );
                    }
                  }
                );
              });
          }
        }
      });
      quickPick.onDidHide(() => quickPick.dispose());
      quickPick.show();
    }
  );

  context.subscriptions.push(disposable);
}
export function deactivate() {}
