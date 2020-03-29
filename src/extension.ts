import * as vscode from 'vscode';
const spawnCommand = require('spawn-command');
function run(cmd: string, options: any) {
	return new Promise((accept, reject) => {
		var opts: any = {};
		let process = spawnCommand(cmd, options);

		process.stdout.on('data', () => {
			vscode.window.showInformationMessage("Your Project is being created");
		});
		process.stderr.on('data', (err: any) => {
			vscode.window.showInformationMessage(err);
		})
		process.on('exit', () => {
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

	const frameWorksSupported: string[] = ['React JS', 'Django', 'Vue', 'Flutter', "HTML", "Chrome Extension"];
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
		const options: any = {};
		options.cwd = cwd;
		vscode.window.showInformationMessage('Hello Worlddd');

		const quickPick = vscode.window.createQuickPick();
		quickPick.items = frameWorksSupported.map((elem: string) => ({ label: elem }));
		quickPick.onDidChangeSelection(async ([selection]) => {
			if (selection) {
				vscode.window.showInformationMessage(selection.label);
				const result = await vscode.window.showInputBox({
					value: 'abcdef',
					valueSelection: [2, 4],
					placeHolder: 'For example: fedcba. But not: 123',

				});
				if (selection.label === "React JS") {
					run(`npx create-react-app ${result}`, options);
					console.log('hi');


				}
				else if (selection.label === "Django") {
					run(`django-admin startproject ${result}`, options);
				}
				else if (selection.label === "Flutter") {
					run(`flutter create ${result}`, options);
				}
				else if (selection.label === "Vue") {
					run(`vue create ${result}`, options);
				}



			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
