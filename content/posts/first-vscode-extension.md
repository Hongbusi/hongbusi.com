---
title: 'My First VS Code Extension'
date: '2022-03-07'
duration: '15 min'
lang: 'en'
---

<GitHubLink repo="Hongbusi/code-snippets" />

## Installation

Make sure you have Node.js and Git installed, then install `yo` and `generator-code`.

``` bash
npm install yo generator-code -g
```

Run the generator and fill out a few fields for a `Code Snippets` project:

``` bash
yo code

# ? What type of extension do you want to create? New Code Snippets
# ? What's the name of your extension? HelloWorld
# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension?
# ? Language id: javascript
# ? Initialize a git repository? Yes
```

## Developing the extension

Create `snippets/snippets.json` file and configure:

``` json
{
  "consoleLog": {
    "prefix": "log",
    "body": "console.log(${1:object})",
    "description": "Displays a message in the console."
  }
}
```

Then, inside the editor, press `F5`. This will compile and run the extension in a new Extension Development Host window.

Create a javascript file and enter `log`, you can choose your own code snippet.

## Publishing extension

> Only publishing to the extended market through vsce is introduced here.

vsce, short for "Visual Studio Code Extensions", is a command-line tool for packaging, publishing and managing VS Code extensions.

``` bash
# installation
npm install vsce -g

# generated xxx.vsix 
vsce package
```

Everything is ready, but you need to log in before publishing to the extension marketplace.

### Get a Personal Access Token

- [Create your own organization](https://docs.microsoft.com/zh-cn/azure/devops/organizations/accounts/create-organization?view=azure-devops).

- From your organization's home page (for example: [https://dev.azure.com/Hongbusi](https://dev.azure.com/Hongbusi)), open the User settings dropdown menu next to your profile image and select **Personal access tokens**.

- On the **Personal Access Tokens** page, select **New Token** to create a new Personal Access Token and set the details.

- Select Create and you'll be presented with your newly created Personal Access Token. Copy it, you'll need it to create a publisher.

### Create a publisher

You can create a new publisher through the Visual Studio Marketplace publisher [management page](https://marketplace.visualstudio.com/manage). You need to login in with the same Microsoft account you used to create the Personal Access Token in the previous section.

Edit `package.json`:

``` json
{
  "publisher": "publisher name"
}
```

Then using `vsce publish` command login:

``` bash
vsce login <publisher name>
```

### Publish an extension

You can publish an extension using `vsce publish` command:

``` bash
vsce publish

# Need to modify `package.json > name` field
# ERROR The Extension Id already exist in the Marketplace. Please use the different Id.
```

## End

VS Code already has a lot of great code snippets extensions, why spend time making your own code snippets extensions?

- Trying: For me, is a relatively new thing, I am curious about this field.

- Customization: Because of the existing extensions, it does not meet my personal code style very well. For example, single or double quotes.

That's all for today, hope it helps you. Thanks for reading, see you next time.
