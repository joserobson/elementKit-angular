
# ElementKit-Angular

ElementKit-Angular is a collection of reusable UI components for Angular applications, designed to simplify development and enhance the user experience. These components are built with flexibility and performance in mind, allowing developers to quickly integrate common UI elements into their Angular projects.

## Features

- **Standalone Components**: All components are standalone and easy to integrate into existing Angular projects.
- **Customizable**: Components are highly customizable, allowing for various design and functionality adaptations.
- **Responsive**: Designed with responsive layouts, ensuring compatibility across different devices and screen sizes.
- **Themed with Bootstrap**: Components are styled using Bootstrap, providing a consistent and modern appearance.

## Components Included

- **VirtualTextarea**: An enhanced `<textarea>` component with additional features like line selection, dynamic height, and efficient handling of large texts.
- **TextSelector**: A dual-list selector component for moving items between available and selected lists with customizable actions.
- **More to come**: The library is actively being developed, with more components planned for future releases.

## Installation

To install the ElementKit-Angular library, use npm:

```bash
npm install elementkit-angular
```

## Usage

To start using ElementKit-Angular components in your project:

1. Import the desired component into your Angular module:

```typescript
import { TextSelectorComponent } from 'elementkit-angular';

@NgModule({
  declarations: [
    // Other components
  ],
  imports: [
    TextSelectorComponent,
    // Other modules
  ],
})
export class AppModule { }
```

2. Add the component to your template:

```html
<app-text-selector
    [size]="10"
    [todasAsTabelas]="allTables"
    [tabelasPreSelecionadas]="preselectedTables">
</app-text-selector>
```

3. Customize the component's behavior via inputs and outputs as needed.

## Documentation

For detailed documentation on each component, including available inputs, outputs, and examples, visit our [GitHub Pages](https://your-github-pages-url) or check the `docs` directory in the repository.

## Contribution

Contributions are welcome! If you'd like to contribute to ElementKit-Angular, please fork the repository, create a new branch, and submit a pull request. Be sure to follow the project's coding standards and write unit tests for any new features.

## License

ElementKit-Angular is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions, suggestions, or feedback, feel free to open an issue on GitHub or contact us directly at [your-email@example.com].

---

This README.md file provides a comprehensive overview of the ElementKit-Angular project, including its features, installation instructions, and usage examples. Adjust the content as needed to fit your specific project requirements.
