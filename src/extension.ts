'use strict';

import * as vscode from 'vscode';
import * as _ from 'lodash';
import * as dirTree from 'directory-tree';
import * as path from 'path';
import * as fs from 'fs';

function getConfig() {
  return vscode.workspace.getConfiguration('UCM') as any;
}

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand('extension.new-component', async (file) => {
    const { directory, platform, styles } = getConfig();
    let filePath = file && (file.fsPath || file.path);

    if (!filePath) {
      filePath = `${vscode.workspace.rootPath}/${directory}`;
    }

    if (filePath) {
      // Ask for name
      const nameInput = await vscode.window.showInputBox({ prompt: 'What is the name of the component?' });
      const name = _.deburr(nameInput);

      // Create camel case type of component
      const props = {
        name,
        nameKebabCase: _.kebabCase(name),
        nameUpperCase: _.upperFirst(_.camelCase(name)),
        nameCamelCase: _.camelCase(name),
        nameSnakeCase: _.snakeCase(name),
        platform: _.kebabCase(platform),
        stylesExtension: styles !== 'none' ? styles : null,
      };

      // Get a directory tree of the template
      const treeRoot = dirTree(path.resolve(__dirname, 'templates', props.platform));
      const depth = [];

      const replaceFileName = (input, ext = '') => {
        let fileName = input;

        for (let key in props) {
          const propsKey = `__${key}__`;

          if (fileName.indexOf(propsKey) >= 0) {
            if (props[key] === null) return null;
            fileName = fileName.replace(propsKey, props[key]);
          }
        }

        return fileName;
      }

      const processTree = file => {
        try {
          const { name, size, type, children, extension } = file;
          const newName = replaceFileName(name, extension);

          if (!newName) return;

          if (type === 'directory') {
            // Create new directory
            depth.push(newName);
            const newPath = path.resolve(filePath, ...depth);
            fs.mkdirSync(newPath);
            children.forEach(processTree);
            depth.pop();
          } else {
            const newPath = path.resolve(filePath, ...depth, newName);
            const contents = fs.readFileSync(file.path, 'utf8');
            const compiled = _.template(contents);
            const transformedContents = compiled(props);
            fs.writeFileSync(newPath, transformedContents);
          }
        } catch (err) {
          console.log('Failed creating file/folder', err);
        }
      };

      if (treeRoot) {
        // Walk through tree, rename folders and files.
        treeRoot.children.forEach(processTree);
      }

      return;
    }

    vscode.window.showInformationMessage('No location for component');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
}
