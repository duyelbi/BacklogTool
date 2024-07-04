import {BacklogService} from "./BacklogService"
import {SpreadSheetServiceImpl} from "./SpreadSheetService"
import {UserProperty} from "./datas"

declare var global: any

const SCRIPT_VERSION = "v2.5.2"

const service = BacklogService(new SpreadSheetServiceImpl)

global.onOpen = function() {
  SpreadsheetApp.getUi()
    .createMenu("Backlog")
    .addItem(service.getMessage("menu_step1"), "init_d")
    .addItem(service.getMessage("menu_step2"), "run_d")
    .addItem(service.getMessage("menu_step3"), "get_d")
    .addToUi()
}

global.init_d = function () {
  const html = HtmlService.createTemplateFromFile("index") as any

  html.mode = "init"
  SpreadsheetApp
    .getUi()
    .showModelessDialog(
      html.evaluate(),
      service.getMessage("title_init") + " " + SCRIPT_VERSION
    )
}

global.run_d = function () {
  const html = HtmlService.createTemplateFromFile("index") as any

  html.mode = "run"
  SpreadsheetApp
    .getUi()
    .showModelessDialog(
      html.evaluate(),
      service.getMessage("title_run") + " " + SCRIPT_VERSION
    )
}

global.get_d = function () {
  const html = HtmlService.createTemplateFromFile("index") as any

  html.mode = "get"
  SpreadsheetApp
    .getUi()
    .showModelessDialog(
      html.evaluate(),
      service.getMessage("title_get") + " " + SCRIPT_VERSION
    )
}

global.init = function (property: UserProperty) {
  service.init(property)
}

global.run = function (property: UserProperty) {
  service.run(property)
}

global.get = function (property: UserProperty) {
  service.get(property)
}

global.getConfig = function () {
  return service.getUserProperties()
}

global.run_cron = function () {
  let config = global.getConfig()
  let property = {
    "space": config.space,
    "domain": config.domain,
    "projectKey": config.projectKey,
    "apiKey": config.apiKey
  }
  service.run(property)
}

global.getMessage = function (key: string) {
  return service.getMessage(key)
}

global.include = function include(filename: string) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}
