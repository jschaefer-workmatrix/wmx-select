
# WmxSelect

WmxSelect is a lightweight, customizable JavaScript library that transforms native select elements into styled dropdown menus with enhanced functionality. It offers callbacks for initialization and selection, customizable classes, and support for disabled items.

## Features

- **Customizable Styles**: Easily customize the appearance of the dropdown menu with CSS.
- **Callbacks Support**: Hooks for both initialization and option selection.
- **Disabled Options**: Support for disabled options within the dropdown.
- **No Dependencies**: WmxSelect doesn't rely on any external libraries.

## Installation

Include WmxSelect in your project by adding the `WmxSelect.js` file to your HTML:

```html
<script src="path/to/wmx-select/index.min.js"></script>
```

*TODO: npm/yarn/... installing*

## Usage

To use WmxSelect, simply create a new instance of the `WmxSelect` class and pass in an options object if necessary.

### Basic Example

```html
<select id="mySelect">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>

<script>
  new WmxSelect({
    element: document.querySelector('#mySelect', {
        // ...override options if necessary
    })
  });
</script>
```

### Options

You can customize WmxSelect by providing an options object:

```javascript
new WmxSelect({
  element: document.querySelector('select'), // The select element to be enhanced
  baseClassPrefix: 'wmx', // Base class for CSS customization
  openClass: 'open', // Class applied when the dropdown is open
  itemAttributes: ['class', 'disabled'], // Attributes to copy from the original select option to the dropdown
  onInit: (wmxselect) => {}, // Callback after initialization
  onSelect: (wmxselect) => {}, // Callback after selecting an option
});
```

### Styling

WmxSelect is fully customizable via CSS. Here are the default classes used:

- `.wmx-select`: The container around the enhanced select dropdown.
- `.wmx-button`: The button element that shows the currently selected item.
- `.wmx-dropdown`: The dropdown list container.
- `.wmx-selected`: Applied to the selected item within the dropdown.

## License

*TODO: Specify the license under which WmxSelect is distributed.*

## Contributing

*TODO: Invite users to contribute to the WmxSelect project by providing guidelines on how they can contribute.*

**Minify js:**

> uglifyjs index.js > index.min.js