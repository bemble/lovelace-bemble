# Bemble

> Just some personal customizations.

## Installation

### Manual

1. Download `bemble.js` file from the [latest-release].
2. Put `bemble.js` file into your `config/www` folder.
3. Add reference to `bemble.js` in Lovelace. There's two way to do that:
   - **Using UI:** _Configuration_ → _Lovelace Dashboards_ → _Resources Tab_ → Click Plus button → Set _Url_ as `/local/bemble.js` → Set _Resource type_ as `JavaScript Module`.
     **Note:** If you do not see the Resources Tab, you will need to enable _Advanced Mode_ in your _User Profile_
   - **Using YAML:** Add following code to `lovelace` section.
     ```yaml
     resources:
       - url: /local/bemble.js
         type: module
     ```
