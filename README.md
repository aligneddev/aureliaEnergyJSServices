# aureliaEnergyJSServices

Aurelia implementation of the energy app using [JavaScriptServices](https://github.com/aspnet/JavaScriptServices) which uses .Net Core.
Read [Building Single Page Applications on ASP.NET Core with JavaScriptServices](https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/) for more details.

See [my main project](https://github.com/aligneddev/JQueryToAurelia) for more information on my presentation and other implementations for comparison of the energy app.

Visit [my blog](http://www.aligneddev.net/blog/2016/JavaScript-Mess-To-CleanerCode-Step-4/) for more information.

## Getting started

I used Visual Studio or VS Code.
It will do a `dotnet restore` for your.
Run `npm install` in the directory.
Run `npm install webpack -g` if you don't have it already installed.
Run `webpack`.
If you are missing vendor.js or other files from wwwroot (you'll see errors) you can run `webpack --config webpack.config.vendor.js` and then 
`webpack --config webpack.config.js`.
