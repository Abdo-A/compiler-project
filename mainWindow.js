const { BrowserWindow, Menu } = require("electron");

exports.win;

exports.createWindow = () => {
  this.win = new BrowserWindow({ width: 800, height: 600 });

  this.win.loadURL(`file://${__dirname}/src/index.html`);

  this.win.webContents.openDevTools();

  this.win.on("closed", () => {
    this.win = null;
  });

  let menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        { label: "Adjust Notification Value" },
        { label: "CoinMarketCap" },
        { label: "Exit" }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
};
